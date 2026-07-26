import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loadYoutubeTranscript } from "@/lib/loader/youtubeLoader";
import { ingestText } from "@/lib/ingest/ingestText";

export async function POST(request) {
  try {
    const { url, notebookId } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    if (!notebookId) {
      return NextResponse.json(
        { error: "Notebook ID is required" },
        { status: 400 }
      );
    }

    // Fetch transcript
    const transcript = await loadYoutubeTranscript(url);

    // Create source first
    const source = await prisma.source.create({
      data: {
        notebookId,
        title: url,
        type: "YOUTUBE",
        status: "PROCESSING",
        originalName: url,
      },
    });

    // Index transcript into Qdrant
    await ingestText({
      text: transcript,
      notebookId,
      title: url,
      source: url,
      type: "youtube",
    });

    // Mark as ready
    const completedSource = await prisma.source.update({
      where: {
        id: source.id,
      },
      data: {
        status: "READY",
      },
    });

    return NextResponse.json({
      success: true,
      source: completedSource,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Failed to process YouTube video",
      },
      {
        status: 500,
      }
    );
  }
}