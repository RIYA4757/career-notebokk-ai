import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const notebooks = await prisma.notebook.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notebooks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch notebooks" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const notebook = await prisma.notebook.create({
      data: {
        title: body.title,
        description: body.description || "",
      },
    });

    return NextResponse.json(notebook);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create notebook" },
      { status: 500 }
    );
  }
}