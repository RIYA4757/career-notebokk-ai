// import { NextResponse } from "next/server";

// import { searchVectors } from "@/lib/retriever/searchVectors";
// import { generateAnswer } from "@/lib/rag/generateAnswer";

// export async function POST(request) {
//   try {
//     const { question } = await request.json();

//     if (!question) {
//       return NextResponse.json(
//         { error: "Question is required" },
//         { status: 400 }
//       );
//     }

//     const searchResults = await searchVectors(question);
//     if (!searchResults || searchResults.length === 0) {
//       return NextResponse.json({
//         answer: "Sorry, I couldn't find anything related to your question.",
//         lesson: null,
//         module: null,
//         course: null,
//         start: null,
//         end: null,
//       });
//     }

    

//     // return NextResponse.json({
//     //   answer,
//     //   sources: searchResults,
//     // });
//     const bestMatch = searchResults[0].payload;
//      if (bestMatch.score < 0.6) {

//     return NextResponse.json({
//         answer: "Sorry, I couldn't find anything related to your question.",
//         lesson: null,
//         module: null,   
//         // lesson: bestMatch.lesson,
//         // module: bestMatch.module,
//         course: null,
//         start: null,
//         end: null,
//     });
// }
// const answer = await generateAnswer(question, searchResults);
// return NextResponse.json({
//       answer,
//       lesson: bestMatch.payload.lesson
//         .replace(".vtt", "")
//         .replace(".srt", ""),
//       module: bestMatch.payload.module,
//       course: bestMatch.payload.course,
//       start: bestMatch.payload.start,
//       end: bestMatch.payload.end,
//     });
//   }
//   catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextResponse } from "next/server";

import { searchVectors } from "@/lib/retriever/searchVectors";
import { generateAnswer } from "@/lib/rag/generateAnswer";

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const searchResults = await searchVectors(question);

    if (!searchResults || searchResults.length === 0) {
      return NextResponse.json({
        answer: "Sorry, I couldn't find anything related to your question.",
        lesson: null,
        module: null,
        course: null,
        start: null,
        end: null,
      });
    }

    const bestMatch = searchResults[0];

    console.log("Best Match Score:", bestMatch.score);

    // if (!bestMatch.payload || bestMatch.score < 0.6) {
    //   return NextResponse.json({
    //     answer:
    //       "Sorry, I couldn't find this topic in the course transcripts.",
    //     lesson: null,
    //     module: null,
    //     course: null,
    //     start: null,
    //     end: null,
    //   });
    // }
    const SIMILARITY_THRESHOLD = 0.5;

if (!bestMatch.payload || bestMatch.score < SIMILARITY_THRESHOLD) {
  return NextResponse.json({
    answer: "Sorry, I couldn't find this topic in the course transcripts.",
    lesson: null,
    module: null,
    course: null,
    start: null,
    end: null,
  });
}

    const answer = await generateAnswer(question, searchResults);

    return NextResponse.json({
      answer,
      lesson: bestMatch.payload.lesson
        ?.replace(".vtt", "")
        ?.replace(".srt", ""),
      module: bestMatch.payload.module,
      course: bestMatch.payload.course,
      start: bestMatch.payload.start,
      end: bestMatch.payload.end,
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