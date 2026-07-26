// import Tesseract from "tesseract.js";
// import path from "path";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// export async function loadImage(filePath) {
//   console.log("===== IMAGE LOADER =====");
//   console.log(filePath);
//   const { data } = await Tesseract.recognize(filePath, "eng");
//   console.log("===== OCR OUTPUT =====");
//   console.log(data.text);
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1000,
//     chunkOverlap: 200,
//   });

//   const docs = [
//     {
//       pageContent: data.text,
//       metadata: {
//         source: filePath,
//         type: "image",
//         fileName: path.basename(filePath),
//       },
//     },
//   ];

//   return splitter.splitDocuments(docs);
// }

import fs from "fs/promises";
import path from "path";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { openai } from "../openai";

export async function loadImage(filePath) {
  console.log("===== IMAGE LOADER =====");
  console.log(filePath);

  const imageBuffer = await fs.readFile(filePath);

  const base64Image = imageBuffer.toString("base64");

  const extension = path.extname(filePath).replace(".", "");

  const mimeType =
    extension === "jpg"
      ? "image/jpeg"
      : extension === "jpeg"
      ? "image/jpeg"
      : `image/${extension}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
Extract ALL visible text from this image.

Rules:
- Return only the extracted text.
- Preserve formatting where possible.
- Do not explain anything.
- Do not summarize.
- If no text exists, return exactly:
NO_TEXT_FOUND
`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract all text from this image.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });

  const text = response.choices[0].message.content ?? "";

  console.log("===== OCR OUTPUT =====");
  console.log(text);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = [
    {
      pageContent: text,
      metadata: {
        source: filePath,
        type: "image",
        fileName: path.basename(filePath),
      },
    },
  ];

  return splitter.splitDocuments(docs);
}