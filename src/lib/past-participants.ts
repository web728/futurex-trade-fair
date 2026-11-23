
import "server-only";

import fs from "node:fs";
import path from "node:path";

export type PastParticipant = {
  id: string;
  name: string;
  logo: string;
  category: "Past Participants";
};

const PARTICIPANTS_DIR = path.join(
  process.cwd(),
  "public",
  "participants"
);

const ALLOWED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".avif",
  ".gif",
]);

function formatLogoName(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (character) =>
      character.toUpperCase()
    );
}

function scanImages(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  const images: string[] = [];

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      images.push(...scanImages(fullPath));
      continue;
    }

    if (!entry.isFile()) continue;

    const extension = path
      .extname(entry.name)
      .toLowerCase();

    if (ALLOWED_EXTENSIONS.has(extension)) {
      images.push(fullPath);
    }
  }

  return images;
}

export function getPastParticipants(): PastParticipant[] {
  const files = scanImages(PARTICIPANTS_DIR);

  return files
    .map((fullPath): PastParticipant => {
      const relativePath = path.relative(
        PARTICIPANTS_DIR,
        fullPath
      );

      const segments = relativePath
        .split(path.sep)
        .map(encodeURIComponent);

      const filename = path.basename(fullPath);

      return {
        id: relativePath.replace(/\\/g, "/"),
        name: formatLogoName(filename),
        logo: `/past-participants/${segments.join("/")}`,
        category: "Past Participants",
      };
    })
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
}
