// import { QdrantClient } from "@qdrant/js-client-rest";

// export const qdrant = new QdrantClient({
//   url: process.env.QDRANT_URL,
//   apiKey: process.env.QDRANT_API_KEY || undefined,
// });
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { QdrantClient } from "@qdrant/js-client-rest";

console.log("QDRANT_URL =", process.env.QDRANT_URL);

export const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY || undefined,
  checkCompatibility: false,
});