import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createEmbedding } from "../embeddings/openaiEmbedding";
import { createCollection } from "../qdrant/createCollection";
import { uploadVectors } from "../qdrant/uploadVectors";

export async function ingestText({
  text,
  notebookId,
  title,
  source,
  type = "youtube",
}) {
  await createCollection();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([text]);

  const points = [];

  for (let i = 0; i < docs.length; i++) {
    const embedding = await createEmbedding(docs[i].pageContent);

    points.push({
      id: Date.now() + i,
      vector: embedding,
      payload: {
        notebookId,
        lesson: title,
        source,
        type,
        start: 0,
        end: 0,
        text: docs[i].pageContent,
      },
    });
  }

  await uploadVectors(points);
}