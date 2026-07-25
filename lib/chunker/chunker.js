/**
 * Groups subtitle segments into semantic chunks.
 */

export function createChunks(parsedTranscript, chunkSize = 8) {
  const chunks = [];

  const { segments } = parsedTranscript;

  for (let i = 0; i < segments.length; i += chunkSize) {
    const batch = segments.slice(i, i + chunkSize);

    chunks.push({
      lesson: parsedTranscript.fileName,
      source: parsedTranscript.relativePath,
      start: batch[0].start,
      end: batch[batch.length - 1].end,
      text: batch.map(s => s.text).join(" "),
    });
  }

  return chunks;
}