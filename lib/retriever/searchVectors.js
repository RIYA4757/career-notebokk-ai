import { qdrant } from "../qdrant/client.js";
import { createEmbedding } from "../embeddings/openaiEmbedding.js";

export async function searchVectors(query) {
  const embedding = await createEmbedding(query);

  const results = await qdrant.search("course-transcripts", {
    vector: embedding,
    limit: 5,
    with_payload: true,
  });

  return results;
}
