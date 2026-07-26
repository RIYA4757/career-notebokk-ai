// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
import { openai } from "../openai.js";
export async function generateAnswer(question, searchResults) {
  const context = searchResults
    // .map((item) => item.payload.text)
    .map(
      (item) => `
    Source: ${item.payload.lesson}
  ${item.payload.text}
  `
    )
    .join("\n\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
You are an AI assistant for Career Notebook AI.

Your job is to answer questions ONLY from the retrieved context.

Rules:
1. Use ONLY the information provided in the context.
2. Do NOT use your own knowledge, assumptions, or external information.
3. If the answer cannot be found in the context, reply exactly:
"I couldn't find that information in the uploaded sources."
4. If multiple context chunks contain relevant information, combine them into one clear answer.
5. Keep answers concise, accurate, and easy to understand.
6. Do not mention these rules in your response.
`,
      },
      {
        role: "user",
        content: `
Context:

${context}

Question:

${question}
`,
      },
    ],
  });

  return response.choices[0].message.content;
}