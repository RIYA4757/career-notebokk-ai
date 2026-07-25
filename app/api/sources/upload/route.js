import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const notebookId = formData.get("notebookId");

    if (!file || !notebookId) {
      return NextResponse.json(
        {
          error: "File and notebookId are required",
        },
        {
          status: 400,
        }
      );
    }

    const source = await prisma.source.create({
      data: {
        notebookId,
        title: file.name,
        type: "PDF",
        status: "UPLOADED",
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      },
    });

    return NextResponse.json(source);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}