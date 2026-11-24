
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();

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

const PDF_EXT = new Set([".pdf"]);

const CATEGORIES = new Set([
  "Announcement",
  "Media Coverage",
  "Event Update",
]);

const FOLDER_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

function readDirectory(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, {
    withFileTypes: true,
  });
}

function readJSON(filename) {
  if (!fs.existsSync(filename)) {
    return null;
  }

  try {
    return JSON.parse(
      fs.readFileSync(filename, "utf8")
    );
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${filename}\n${error.message}`
    );
  }
}

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

function getDirectory(folder) {
  return folder === "general"
    ? NEWS_DIR
    : path.join(NEWS_DIR, folder);
}

function encodePath(relativePath) {
  return relativePath
    .split(/[\\/]+/)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function assetURL(folder, relativePath) {
  const prefix =
    folder === "general"
      ? "/news"
      : `/news/${encodeURIComponent(folder)}`;

  return `${prefix}/${encodePath(relativePath)}`;
}

function collectFiles(directory, baseDirectory) {
  const results = [];

  for (const entry of readDirectory(directory)) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      results.push(
        ...collectFiles(absolutePath, baseDirectory)
      );
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path
      .extname(entry.name)
      .toLowerCase();

    if (
      !IMAGE_EXT.has(extension) &&
      !PDF_EXT.has(extension)
    ) {
      continue;
    }

    results.push({
      absolutePath,
      relativePath: path.relative(
        baseDirectory,
        absolutePath
      ),
      extension,
    });
  }

  return results;
}

function getAssets(folder) {
  const directory = getDirectory(folder);

  // The "general" collection must not scan
  // other exhibition folders.
  const files =
    folder === "general"
      ? readDirectory(directory)
          .filter((entry) => entry.isFile())
          .map((entry) => ({
            absolutePath: path.join(
              directory,
              entry.name
            ),
            relativePath: entry.name,
            extension: path
              .extname(entry.name)
              .toLowerCase(),
          }))
          .filter(
            (item) =>
              IMAGE_EXT.has(item.extension) ||
              PDF_EXT.has(item.extension)
          )
      : collectFiles(directory, directory);

  return files
    .sort((a, b) =>
      a.relativePath.localeCompare(
        b.relativePath,
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      )
    )
    .map((file) => ({
      title: niceTitle(
        path.basename(file.relativePath)
      ),
      url: assetURL(
        folder,
        file.relativePath
      ),
      type: PDF_EXT.has(file.extension)
        ? "pdf"
        : "image",
    }));
}

function getLinks(folder) {
  const filename = path.join(
    getDirectory(folder),
    "links.json"
  );

  const data = readJSON(filename);

  if (data === null) {
    return [];
  }

  if (!Array.isArray(data)) {
    throw new Error(
      `links.json must be an array: ${filename}`
    );
  }

  const links = new Map();

  for (const item of data) {
    if (
      !item ||
      typeof item.publisher !== "string" ||
      typeof item.title !== "string" ||
      typeof item.url !== "string"
    ) {
      console.warn(
        `Skipping malformed media link in ${folder}`
      );
      continue;
    }

    try {
      const parsed = new URL(
        item.url.trim()
      );

      if (
        parsed.protocol !== "https:" &&
        parsed.protocol !== "http:"
      ) {
        console.warn(
          `Skipping unsupported URL in ${folder}`
        );
        continue;
      }

      links.set(parsed.href, {
        publisher: item.publisher.trim(),
        title: item.title.trim(),
        url: parsed.href,
      });
    } catch {
      console.warn(
        `Skipping invalid media URL in ${folder}: ${item.url}`
      );
    }
  }

  return Array.from(links.values());
}

function validateArticle(config, filename) {
  if (
    !config ||
    typeof config !== "object" ||
    typeof config.title !== "string" ||
    !config.title.trim() ||
    typeof config.excerpt !== "string" ||
    typeof config.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(config.date) ||
    Number.isNaN(Date.parse(config.date)) ||
    !CATEGORIES.has(config.category) ||
    typeof config.event !== "string" ||
    typeof config.country !== "string" ||
    typeof config.edition !== "string" ||
    !Array.isArray(config.paragraphs) ||
    !config.paragraphs.every(
      (p) => typeof p === "string"
    ) ||
    (
      config.dignitaries !== undefined &&
      (
        !Array.isArray(config.dignitaries) ||
        !config.dignitaries.every(
          (name) => typeof name === "string"
        )
      )
    )
  ) {
    throw new Error(
      `Invalid article configuration: ${filename}`
    );
  }
}

function getCover(folder, assets, requested) {
  const images = assets.filter(
    (asset) => asset.type === "image"
  );

  if (
    typeof requested === "string" &&
    requested.trim()
  ) {
    const expectedURL = assetURL(
      folder,
      requested.trim()
    );

    const match = images.find(
      (image) => image.url === expectedURL
    );

    if (match) {
      return match.url;
    }

    console.warn(
      `Cover not found in ${folder}: ${requested}`
    );
  }

  return images[0]?.url;
}

function getFolders() {
  return readDirectory(NEWS_DIR)
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter(
      (name) =>
        name !== "general" &&
        FOLDER_PATTERN.test(name)
    )
    .sort();
}

function generate() {
  if (!fs.existsSync(NEWS_DIR)) {
    throw new Error(
      `Missing news directory: ${NEWS_DIR}`
    );
  }

  const folders = [
    "general",
    ...getFolders(),
  ];

  const articles = [];
  const collections = [];
  const usedSlugs = new Set();

  for (const folder of folders) {
    const directory = getDirectory(folder);

    const assets = getAssets(folder);

    const configPath = path.join(
      directory,
      "article.json"
    );

    const config =
      folder === "general"
        ? null
        : readJSON(configPath);

    if (config !== null) {
      validateArticle(config, configPath);
    }

    const slug =
      config === null
        ? undefined
        : typeof config.slug === "string" &&
            config.slug.trim()
          ? config.slug.trim()
          : folder;

    if (
      slug &&
      !FOLDER_PATTERN.test(slug)
    ) {
      throw new Error(
        `Invalid article slug: ${slug}`
      );
    }

    if (slug && usedSlugs.has(slug)) {
      throw new Error(
        `Duplicate article slug: ${slug}`
      );
    }

    if (slug) {
      usedSlugs.add(slug);
    }

    const image = getCover(
      folder,
      assets,
      config?.cover
    );

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

    if (config === null) {
      continue;
    }

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
      featured: config.featured === true,
      image,
      eventUrl:
        typeof config.eventUrl === "string"
          ? config.eventUrl
          : undefined,
      paragraphs: config.paragraphs,
      dignitaries: config.dignitaries || [],
      mediaLinks: getLinks(folder),
      assets,
    });
  }

  articles.sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      a.title.localeCompare(b.title)
  );

  if (articles.length === 0) {
    throw new Error(
      "No news articles found. Check article.json files."
    );
  }

  const result = {
    articles,
    collections,
  };

  fs.mkdirSync(
    path.dirname(OUTPUT_FILE),
    { recursive: true }
  );

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(result, null, 2) + "\n",
    "utf8"
  );

  const totalImages = collections.reduce(
    (count, collection) =>
      count +
      collection.assets.filter(
        (asset) => asset.type === "image"
      ).length,
    0
  );

  const totalPDFs = collections.reduce(
    (count, collection) =>
      count +
      collection.assets.filter(
        (asset) => asset.type === "pdf"
      ).length,
    0
  );

  console.log("Futurex Newsroom generated");
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
    `Total media assets: ${totalImages + totalPDFs}`
  );
}

generate();
