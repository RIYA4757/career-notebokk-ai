import { NextResponse } from "next/server";
import path from "path";
import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/utils/fileStorage";
// import { extractZipFile } from "@/lib/utils/extractZip";
import { ingestDocuments } from "@/lib/ingest/ingestDocuments";
import { extractZipFile } from "../../../../lib/utils/extractZip.js";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const notebookId = formData.get("notebookId");

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    const allowedExtensions = [
      ".zip",
      ".pdf",
      ".docx",
      ".txt",
      ".srt",
      ".vtt",
      ".png",
      ".jpg",
      ".jpeg",
    //   ".csv",
    //   ".md",
        ".pptx",
        ".ppt",
    ];

    const extension = path.extname(file.name).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    if (!notebookId) {
      return NextResponse.json(
        { error: "Notebook ID is required" },
        { status: 400 }
      );
    }

    const source = await prisma.source.create({
      data: {
        notebookId,
        title: file.name,
        type: path.extname(file.name).replace(".", "").toUpperCase(),
        status: "PROCESSING",
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      },
    });

    const { uploadDir, filePath } = await saveUploadedFile(
      file,
      notebookId,
      source.id
    );

    let ingestPath = uploadDir;

    if (file.name.toLowerCase().endsWith(".zip")) {
      ingestPath = await extractZipFile(filePath, uploadDir);
    }

    await prisma.source.update({
      where: {
        id: source.id,
      },
      data: {
        filePath,
        extractPath: ingestPath,
      },
    });

    await ingestDocuments(ingestPath, notebookId);

    const completedSource = await prisma.source.update({
      where: {
        id: source.id,
      },
      data: {
        status: "READY",
      },
    });

    return NextResponse.json(completedSource);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}