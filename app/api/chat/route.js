import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { searchVectors } from "@/lib/retriever/searchVectors";
import { generateAnswer } from "@/lib/rag/generateAnswer";

export async function POST(request) {
  try {
    const { notebookId, message } = await request.json();

    if (!notebookId || !message) {
      return NextResponse.json(
        {
          error: "Notebook ID and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.message.create({
      data: {
        notebookId,
        role: "user",
        content: message,
      },
    });

    const searchResults = await searchVectors(message, notebookId);

    console.log("Search Results:", searchResults);

    const bestResult = searchResults?.[0];

    if (!bestResult || bestResult.score < 0.12) {
      return NextResponse.json({
        answer: "I couldn't find that information in your uploaded sources.",
        sources: [],
      });
    }

    const answer = await generateAnswer(message, searchResults);

    await prisma.message.create({
      data: {
        notebookId,
        role: "assistant",
        content: answer,
      },
    });

    return NextResponse.json({
      answer,
      sources: searchResults.map((item) => ({
        score: item.score,
        payload: item.payload,
      })),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}