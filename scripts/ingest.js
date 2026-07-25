import dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});

import path from "path";
import { scanDirectory } from "../lib/scanner/directoryScanner.js";
import { loadTranscripts } from "../lib/loader/transcriptLoader.js";
import { parseTranscript } from "../lib/parser/subtitleParser.js";
import { createChunks } from "../lib/chunker/chunker.js";
import { extractMetadata } from "../lib/metadata/metadataExtractor.js";

import { createEmbedding } from "../lib/embeddings/openaiEmbedding.js";

import { createCollection } from "../lib/qdrant/createCollection.js";
import { uploadVectors } from "../lib/qdrant/uploadVectors.js";
//to check the openai key is loaded or not
console.log(process.env.OPENAI_API_KEY ? "OpenAI key loaded " : "Key missing ");

async function ingest() {
  try {
    console.log("Scanning transcripts...");

    const transcriptFiles = await scanDirectory(
      path.join(process.cwd(), "data")
    );

    console.log(`Found ${transcriptFiles.length} transcript files`);

    const loadedTranscripts = await loadTranscripts(transcriptFiles);
    await createCollection();
    // const points = [];
    // let id = 1;
    let id = 1;
    let points = [];
    const BATCH_SIZE = 100;

    for (const transcript of loadedTranscripts) {
      console.log(`Processing: ${transcript.fileName}`);
      const parsed = parseTranscript(transcript);
      const chunks = createChunks(parsed);
      
    //   const enrichedChunks = extractMetadata(chunks);

    //   for (const chunk of enrichedChunks) {
    //     const embedding = await createEmbedding(chunk.text);

    //     points.push({
    //       id: id++,
    //       vector: embedding,
    //       payload: chunk,
    //     });
    //   }

        for (const chunk of chunks) {
            const enrichedChunk = extractMetadata(chunk);

            const embedding = await createEmbedding(enrichedChunk.text);
            console.log(`Embedding: ${enrichedChunk.lesson}`);
            points.push({
                id: id++,
                vector: embedding,
                payload: enrichedChunk,
            });
            if (points.length >= BATCH_SIZE) {
                await uploadVectors(points);

            console.log(`Uploaded ${id - 1} vectors`);
            points = [];
            }
        }
    }
    console.log(`Total chunks processed: ${id - 1}`);
    // await createCollection();
    if(points.length > 0) {
        await uploadVectors(points);
    }
    console.log(`Total vectors uploaded: ${id - 1}`);
    console.log("Ingestion completed successfully.");
  } catch (error) {
    console.error(error);
  }
}

ingest();