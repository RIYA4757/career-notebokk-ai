import dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});


import { searchVectors } from "../lib/retriever/searchVectors.js";
import { generateAnswer } from "../lib/rag/generateAnswer.js";
console.log(process.env.OPENAI_API_KEY ? "OpenAI key loaded " : "Key missing ");


async function test() {
  const question = "What is Expo?";

  const results = await searchVectors(question);

  const answer = await generateAnswer(question, results);

 const bestMatch = results[0].payload;

  console.log("\n===== ANSWER =====\n");
  console.log(answer);

  console.log("\n===== SOURCE =====\n");
  console.log("Lesson :", bestMatch.lesson);
  console.log("Module :", bestMatch.module);
  console.log("Timestamp :", `${bestMatch.start} - ${bestMatch.end}`);
  console.log("Course :", bestMatch.course);
}

test();