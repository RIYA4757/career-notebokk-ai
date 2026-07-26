import extract from "extract-zip";
import path from "path";

export async function extractZipFile(zipPath, uploadDir) {
  const extractPath = path.join(uploadDir, "extracted");

  await extract(zipPath, {
    dir: extractPath,
  });

  return extractPath;
}