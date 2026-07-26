import { YoutubeTranscript } from "youtube-transcript";

export async function loadYoutubeTranscript(url) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);

    return transcript
      .map((item) => item.text)
      .join(" ");
  } catch (error) {
    console.error("YouTube transcript error:", error);
    throw new Error("Unable to fetch YouTube transcript.");
  }
}