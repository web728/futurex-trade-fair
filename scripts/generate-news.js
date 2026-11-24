
const fs = require("node:fs");
const path = require("node:path");

// ==========================================
// CONFIGURATION
// ==========================================

const ROOT = path.resolve(__dirname, "..");

const NEWS_DIR = path.join(
  ROOT,
  "public",
  "news"
);

const OUTPUT_FILE = path.join(
  ROOT,
  "src",
  "data",
  "auto-news.json"
);

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

const CATEGORIES = new Set([
  "Announcement",
  "Media Coverage",
  "Event Update",
]);

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

// ==========================================
// DIRECTORY UTILITIES
// ==========================================

function entries(directory) {
  return fs
    .readdirSync(directory, {
      withFileTypes: true,
    })
    .filter(
      (entry) => !entry.name.startsWith(".")
    )
    .sort((a, b) =>
      a.name.localeCompare(b.name, "en")
    );
}

// ==========================================
// CASE-INSENSITIVE JSON READER
// Windows + Linux + Vercel compatible
// ==========================================

function readJSON(directory, name) {
  const matches = entries(directory).filter(
    (entry) =>
      entry.isFile() &&
      entry.name.toLowerCase() ===
        name.toLowerCase()
  );

  if (matches.length > 1) {
    throw new Error(
      `Ambiguous ${name} in ${directory}`
    );
  }

  if (matches.length === 0) {
    return undefined;
  }

  const filename = path.join(
    directory,
    matches[0].name
  );

  if (matches[0].name !== name) {
    console.warn(
      `[News] Filename casing detected: ${filename}`
    );
  }

  try {
    const content = fs
      .readFileSync(filename, "utf8")
      .replace(/^\uFEFF/, "");

    return {
      filename,
      data: JSON.parse(content),
    };
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${filename}\n${error.message}`
    );
  }
}

// ==========================================
// TITLE FORMATTER
// ==========================================

function niceTitle(value) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

// ==========================================
// SAFE URL SLUG GENERATOR
// ==========================================

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ==========================================
// PRODUCTION-SAFE ASSET URL
// ==========================================

function assetURL(filename) {
  const relativePath = path.relative(
    NEWS_DIR,
    filename
  );

  return (
    "/news/" +
    relativePath
      .split(path.sep)
      .map(encodeURIComponent)
      .join("/")
  );
}

// ==========================================
// DISCOVER IMAGES AND PDF FILES
// ==========================================

function getAssets(directory, recursive = true) {
  const files = [];

  function walk(currentDirectory) {
    for (const entry of entries(currentDirectory)) {
      const filename = path.join(
        currentDirectory,
        entry.name
      );

      if (
        entry.isDirectory() &&
        recursive
      ) {
        walk(filename);
      }

      if (!entry.isFile()) {
        continue;
      }

      const extension = path
        .extname(entry.name)
        .toLowerCase();

      if (
        IMAGE_EXT.has(extension) ||
        extension === ".pdf"
      ) {
        files.push(filename);
      }
    }
  }

  walk(directory);

  return files
    .sort((a, b) =>
      a.localeCompare(b, "en", {
        numeric: true,
        sensitivity: "base",
      })
    )
    .map((filename) => ({
      title: niceTitle(
        path.basename(filename)
      ),

      url: assetURL(filename),

      type:
        path.extname(filename).toLowerCase() ===
        ".pdf"
          ? "pdf"
          : "image",
    }));
}

// ==========================================
// EXTERNAL MEDIA LINKS
// ==========================================

function getLinks(directory) {
  const source = readJSON(
    directory,
    "links.json"
  );

  if (!source) {
    return [];
  }

  if (!Array.isArray(source.data)) {
    throw new Error(
      `links.json must be an array: ${source.filename}`
    );
  }

  const links = new Map();

  for (const item of source.data) {
    if (
      !item ||
      !["publisher", "title", "url"].every(
        (key) => typeof item[key] === "string"
      )
    ) {
      console.warn(
        `[News] Skipping malformed media link in ${source.filename}`
      );

      continue;
    }

    try {
      const parsedURL = new URL(
        item.url.trim()
      );

      if (
        !["http:", "https:"].includes(
          parsedURL.protocol
        )
      ) {
        throw new Error(
          "Unsupported URL protocol"
        );
      }

      links.set(parsedURL.href, {
        publisher: item.publisher.trim(),
        title: item.title.trim(),
        url: parsedURL.href,
      });
    } catch {
      console.warn(
        `[News] Skipping invalid media URL: ${item.url}`
      );
    }
  }

  return Array.from(links.values());
}

// ==========================================
// ARTICLE VALIDATION
// ==========================================

function validateArticle(config, filename) {
  const valid =
    config &&
    typeof config === "object" &&
    !Array.isArray(config) &&

    [
      "title",
      "excerpt",
      "date",
      "event",
      "country",
      "edition",
    ].every(
      (key) => typeof config[key] === "string"
    ) &&

    config.title.trim() &&

    /^\d{4}-\d{2}-\d{2}$/.test(
      config.date
    ) &&

    !Number.isNaN(
      Date.parse(config.date)
    ) &&

    new Date(config.date)
      .toISOString()
      .slice(0, 10) === config.date &&

    CATEGORIES.has(config.category) &&

    Array.isArray(config.paragraphs) &&

    config.paragraphs.every(
      (paragraph) =>
        typeof paragraph === "string"
    ) &&

    (
      config.dignitaries === undefined ||
      (
        Array.isArray(config.dignitaries) &&
        config.dignitaries.every(
          (name) => typeof name === "string"
        )
      )
    );

  if (!valid) {
    throw new Error(
      `Invalid article configuration: ${filename}`
    );
  }
}

// ==========================================
// AUTOMATIC COVER IMAGE
// ==========================================

function getCover(directory, assets, requested) {
  const images = assets.filter(
    (asset) => asset.type === "image"
  );

  if (
    typeof requested === "string" &&
    requested.trim()
  ) {
    const requestedPath = requested
      .trim()
      .replace(/\\/g, "/");

    const expectedURL = assetURL(
      path.resolve(directory, requestedPath)
    );

    // Exact filename match.
    const exactMatch = images.find(
      (image) => image.url === expectedURL
    );

    if (exactMatch) {
      return exactMatch.url;
    }

    // Case-insensitive filename match.
    const insensitiveMatches = images.filter(
      (image) =>
        image.url.toLowerCase() ===
        expectedURL.toLowerCase()
    );

    if (insensitiveMatches.length === 1) {
      return insensitiveMatches[0].url;
    }

    console.warn(
      `[News] Cover missing or ambiguous in ${directory}: ${requested}`
    );
  }

  // Automatically use first available image.
  return images[0]?.url;
}

// ==========================================
// MAIN NEWS GENERATOR
// ==========================================

function generate() {
  console.log("");
  console.log("==========================================");
  console.log("Futurex Newsroom Generator");
  console.log("==========================================");

  console.log(
    `[News] Environment: ${process.env.NODE_ENV || "default"}`
  );

  console.log(
    `[News] Project root: ${ROOT}`
  );

  console.log(
    `[News] Scanning: ${NEWS_DIR}`
  );

  // Check source directory.
  if (!fs.existsSync(NEWS_DIR)) {
    throw new Error(
      `[News] Missing news directory: ${NEWS_DIR}`
    );
  }

  // Discover all non-hidden folders.
  // Supports lowercase, uppercase, spaces,
  // underscores and hyphens.
  const folders = entries(NEWS_DIR)
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  console.log(
    `[News] Folders found: ${folders.length}`
  );

  console.log(
    `[News] Folder names: ${JSON.stringify(folders)}`
  );

  const articles = [];
  const collections = [];
  const usedSlugs = new Set();

  // General assets directly inside public/news.
  const generalAssets = getAssets(
    NEWS_DIR,
    false
  );

  // Also supports article.json in news root.
  const rootSource = readJSON(
    NEWS_DIR,
    "article.json"
  );

  const locations = [
    {
      folder: "general",
      dir: NEWS_DIR,
      assets: generalAssets,
      source: rootSource,
    },
  ];

  // Discover exhibition folders.
  for (const folder of folders) {
    const directory = path.join(
      NEWS_DIR,
      folder
    );

    // Preserve reserved general collection behavior.
    if (folder === "general") {
      if (entries(directory).length > 0) {
        console.warn(
          `[News] Reserved folder: ${directory}. Move its contents to an exhibition folder or news root.`
        );
      }

      continue;
    }

    console.log(
      `[News] Processing folder: ${folder}`
    );

    const assets = getAssets(
      directory,
      true
    );

    const source = readJSON(
      directory,
      "article.json"
    );

    locations.push({
      folder,
      dir: directory,
      assets,
      source,
    });
  }

  // Generate articles and media collections.
  for (const {
    folder,
    dir,
    assets,
    source,
  } of locations) {
    const config = source?.data;

    let slug;

    if (source) {
      console.log(
        `[News] Article found: ${source.filename}`
      );

      validateArticle(
        config,
        source.filename
      );

      // Preserve explicitly configured valid slugs.
      // Automatically normalize folder-based slugs.
      slug =
        typeof config.slug === "string" &&
        config.slug.trim()
          ? config.slug.trim()
          : slugify(folder);

      if (!SLUG_PATTERN.test(slug)) {
        throw new Error(
          `Invalid article slug: ${slug} (${source.filename})`
        );
      }

      if (usedSlugs.has(slug)) {
        throw new Error(
          `Duplicate article slug: ${slug}`
        );
      }

      usedSlugs.add(slug);
    } else {
      console.log(
        `[News] No article.json in ${dir}. Checking media assets.`
      );
    }

    // Resolve cover image.
    const image = getCover(
      dir,
      assets,
      config?.cover
    );

    // Generate media collection even if
    // article.json does not exist.
    if (assets.length > 0) {
      collections.push({
        folder,

        title:
          folder === "general"
            ? "General Press & Media"
            : config?.event ||
              niceTitle(folder),

        image,

        assets,

        articleSlug: slug,
      });
    }

    // Media-only folder.
    if (!source) {
      continue;
    }

    // Generate article.
    articles.push({
      slug,

      folder,

      title: config.title,

      excerpt: config.excerpt,

      date: config.date,

      category: config.category,

      event: config.event,

      country: config.country,

      edition: config.edition,

      featured:
        config.featured === true,

      image,

      eventUrl:
        typeof config.eventUrl === "string"
          ? config.eventUrl
          : undefined,

      paragraphs: config.paragraphs,

      dignitaries:
        config.dignitaries || [],

      mediaLinks: getLinks(dir),

      assets,
    });

    console.log(
      `[News] Article generated: ${slug}`
    );
  }

  // Sort newest articles first.
  articles.sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      a.title.localeCompare(b.title)
  );

  // Prevent deployment with missing article data.
  if (articles.length === 0) {
    console.error("");
    console.error("==========================================");
    console.error("[News] ERROR: No articles found.");
    console.error("==========================================");

    console.error(
      "Check that article.json files exist inside public/news/<folder>/."
    );

    console.error(
      "Check that all article.json files are committed to GitHub."
    );

    console.error(
      "Inspect the folder diagnostics printed above."
    );

    throw new Error(
      "No news articles found. Check committed article.json files."
    );
  }

  // Final JSON structure.
  const result = {
    articles,
    collections,
  };

  // Ensure output directory exists.
  fs.mkdirSync(
    path.dirname(OUTPUT_FILE),
    {
      recursive: true,
    }
  );

  // Write generated news data.
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(result, null, 2) + "\n",
    "utf8"
  );

  // Asset statistics.
  const allAssets = collections.flatMap(
    (collection) => collection.assets
  );

  const totalImages = allAssets.filter(
    (asset) => asset.type === "image"
  ).length;

  const totalPDFs = allAssets.filter(
    (asset) => asset.type === "pdf"
  ).length;

  console.log("");
  console.log("==========================================");
  console.log("Futurex Newsroom Generated Successfully");
  console.log("==========================================");

  console.log(
    `Articles: ${articles.length}`
  );

  console.log(
    `Media collections: ${collections.length}`
  );

  console.log(
    `Images: ${totalImages}`
  );

  console.log(
    `PDFs: ${totalPDFs}`
  );

  console.log(
    `Total media assets: ${allAssets.length}`
  );

  console.log(
    `Output: ${OUTPUT_FILE}`
  );

  console.log("==========================================");
  console.log("");
}

// ==========================================
// EXECUTE GENERATOR
// ==========================================

generate();
