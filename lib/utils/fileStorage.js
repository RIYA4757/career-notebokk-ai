import fs from "fs/promises";
import path from "path";

export async function saveUploadedFile(file, notebookId, sourceId) {
  const uploadDir = path.join(
    process.cwd(),
    "uploads",
    notebookId,
    sourceId
  );

  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  const filePath = path.join(uploadDir, file.name);

  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filePath, buffer);

  return {
    uploadDir,
    filePath,
  };
}