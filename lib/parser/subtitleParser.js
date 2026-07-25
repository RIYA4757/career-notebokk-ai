/**
 * Parse SRT/VTT subtitles into structured segments.
 */

export function parseTranscript(transcript) {
  const content = transcript.content.replace(/\r/g, "");

  const blocks = content
    .split(/\n\s*\n/)
    .filter(Boolean);

  const segments = [];

  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);

    let timeLine;
    let textStart = 0;

    if (lines[0].includes("-->")) {
      timeLine = lines[0];
      textStart = 1;
    } else {
      timeLine = lines[1];
      textStart = 2;
    }

    if (!timeLine || !timeLine.includes("-->")) continue;

    const [start, end] = timeLine.split("-->").map(t => t.trim());

    const text = lines
      .slice(textStart)
      .join(" ")
      .trim();

    if (!text) continue;

    segments.push({
      start,
      end,
      text,
    });
  }

  return {
    ...transcript,
    segments,
  };
}