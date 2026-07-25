import fs from "fs/promises";

/**
 * Loads transcript contents into memory.
 *
 * @param {Array} transcriptFiles
 * @returns {Promise<Array>}
 */
export async function loadTranscripts(transcriptFiles) {
  const loadedFiles = [];

  for (const file of transcriptFiles) {
    const content = await fs.readFile(file.absolutePath, "utf-8");

    loadedFiles.push({
      ...file,
      content,
    });
  }

  return loadedFiles;
}