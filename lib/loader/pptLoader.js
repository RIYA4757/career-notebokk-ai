import { parseOffice } from "officeparser";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function loadPpt(filePath) {
  console.log("===== PPT LOADER =====");
  console.log(filePath);

  const result = await parseOffice(filePath);

  const text = result.toText();

  console.log("EXTRACTED TEXT:");
  console.log(text);

  if (!text || !text.trim()) {
    return [];
  }

  const docs = [
    new Document({
      pageContent: text,
      metadata: {
        type: "pptx",
      },
    }),
  ];

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  return await splitter.splitDocuments(docs);
}