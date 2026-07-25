import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.source.delete({
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
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}