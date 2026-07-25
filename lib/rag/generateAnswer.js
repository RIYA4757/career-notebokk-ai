import OpenAI from "openai";

export async function generateAnswer(question, searchResults) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const context = searchResults
    .map((item) => item.payload.text)
    .join("\n\n");

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "Answer ONLY from the provided transcript context. If the answer is not present, say you don't know.",
      },
      {
        role: "user",
        content: `Context:

${context}

Question:

${question}`,
      },
    ],
  });

  return response.choices[0].message.content;
}