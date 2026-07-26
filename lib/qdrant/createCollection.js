// import { qdrant } from "./client.js";

// export async function createCollection() {
//   try {
//     await qdrant.createCollection("course-transcripts", {
//       vectors: {
//         size: 1536,
//         distance: "Cosine",
//       },
//     });

//     console.log("Collection created");
//      } catch (error) {
//     console.log("Collection error:", error);
//     // console.error(error);
//   }
//   try {
//     await qdrant.createPayloadIndex("course-transcripts", {
//       field_name: "notebookId",
//       field_schema: "keyword",
//     });

//     console.log("Created notebookId payload index.");
//   } catch (error) {
//     console.log("Payload index error:",error);
//   }
  
// }

// // createCollection();


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
    console.error("Collection error:", error);
  }

  try {
    console.log("Creating payload index...");

    const result = await qdrant.createPayloadIndex(
      "course-transcripts",
      {
        field_name: "notebookId",
        field_schema: "keyword",
      }
    );

    console.log("Payload index created:", result);
  } catch (error) {
    console.error("Payload index error:", error);
  }
}
