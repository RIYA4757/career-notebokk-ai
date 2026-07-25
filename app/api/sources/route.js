import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const notebookId = searchParams.get("notebookId");

    const sources = await prisma.source.findMany({
      where: notebookId ? { notebookId } : {},
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sources);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch sources",
      },
      {
        status: 500,
      }
    );
  }
}