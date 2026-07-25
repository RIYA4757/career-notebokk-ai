import path from "path";

export function extractMetadata(chunk) {
  const parts = chunk.source.split(path.sep);

  return {
    ...chunk,
    course: parts[0] || "",
    module: parts[1] || "",
    lessonFolder: parts[2] || "",
  };
}