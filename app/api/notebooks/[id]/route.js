import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();
    const { title, description } = body;

    const updatedNotebook = await prisma.notebook.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedNotebook);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update notebook",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.source.deleteMany({
      where: {
        notebookId: id,
      },
    });

    await prisma.notebook.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete notebook",
      },
      {
        status: 500,
      }
    );
  }
}