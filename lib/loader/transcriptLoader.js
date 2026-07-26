import fs from "fs/promises";
export async function loadTranscripts(files) {
  const loadedFiles = [];

  for (const file of files) {
    if (file.extension === ".srt" || file.extension === ".vtt") {
      const content = await fs.readFile(file.absolutePath, "utf-8");

      loadedFiles.push({
        ...file,
        content,
      });
    } else {
      loadedFiles.push({
        ...file,
      });
    }
  }

  return loadedFiles;
}