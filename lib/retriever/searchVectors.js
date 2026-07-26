import { qdrant } from "../qdrant/client.js";
import { createEmbedding } from "../embeddings/openaiEmbedding.js";

export async function searchVectors(question, notebookId) {
  const embedding = await createEmbedding(question);

  const results = await qdrant.search("course-transcripts", {
    vector: embedding,
    limit: 10,
    with_payload: true,
    filter: {
      must: [
        {
          key: "notebookId",
          match: {
            value: notebookId,
          },
        },
      ],
    },
  });
    console.log("Qdrant Results:", JSON.stringify(results, null, 2));
    console.log(
      results.map((r) => ({
        score: r.score,
        text: r.payload.text?.substring(0, 120),
      }))
    );
  return results;
}