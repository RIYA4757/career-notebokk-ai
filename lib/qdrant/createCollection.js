import { qdrant } from "./client.js";

export async function createCollection() {
  try {
    await qdrant.createCollection("course-transcripts", {
      vectors: {
        size: 1536,
        distance: "Cosine",
      },
    });

    console.log("Collection created");
  } catch (error) {
    console.log("Collection already exists or an error occurred.");
    console.error(error);
  }
}

// createCollection();