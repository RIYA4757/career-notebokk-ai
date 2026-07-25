import { qdrant } from "./client.js";

const BATCH_SIZE = 100;
export async function uploadVectors(points) {
    for (let i = 0; i < points.length; i += BATCH_SIZE) {
    const batch = points.slice(i, i + BATCH_SIZE);

    await qdrant.upsert("course-transcripts", {
        wait: true,
        points: batch,
  });

  console.log(`Uploaded ${Math.min(i + BATCH_SIZE, points.length)} / ${points.length}`);
}
 console.log("All vectors uploaded");
}
