import fs from "fs/promises";
import path from "path";

const SUPPORTED_EXTENSIONS = new Set([".vtt", ".srt"]);

/**
 * Recursively scans a directory and returns supported transcript files.
 *
 * @param {string} rootPath - Root directory to scan.
 * @returns {Promise<Array>}
 */
export async function scanDirectory(rootPath) {
  try {
    await fs.access(rootPath);
  } catch {
    throw new Error(`Directory not found: ${rootPath}`);
  }

  const transcriptFiles = [];

  async function traverse(currentPath) {
    const entries = await fs.readdir(currentPath, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const absolutePath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        await traverse(absolutePath);
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();

      if (!SUPPORTED_EXTENSIONS.has(extension)) {
        continue;
      }

      transcriptFiles.push({
        fileName: entry.name,
        extension,
        absolutePath,
        relativePath: path.relative(rootPath, absolutePath),
      });
    }
  }

  await traverse(rootPath);

  return transcriptFiles;
}