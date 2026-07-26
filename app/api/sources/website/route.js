import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loadWebsite } from "@/lib/loader/websiteLoader";
import { ingestText } from "@/lib/ingest/ingestText";

export async function POST(request) {
  try {
    const { url, notebookId } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 }
      );
    }

    if (!notebookId) {
      return NextResponse.json(
        { error: "Notebook ID is required" },
        { status: 400 }
      );
    }

    const website = await loadWebsite(url);

    const source = await prisma.source.create({
      data: {
        notebookId,
        title: website.title,
        type: "WEBSITE",
        status: "PROCESSING",
        originalName: url,
      },
    });

    await ingestText({
      text: website.text,
      notebookId,
      title: website.title,
      source: url,
      type: "website",
    });

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
        error: error.message || "Failed to process website",
      },
      {
        status: 500,
      }
    );
  }
}