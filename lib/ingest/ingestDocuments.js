import { scanDirectory } from "../scanner/directoryScanner.js";
import { loadTranscripts } from "../loader/transcriptLoader.js";
import { parseTranscript } from "../parser/subtitleParser.js";
import { createChunks } from "../chunker/chunker.js";
import { extractMetadata } from "../metadata/metadataExtractor.js";
//  import { loadPDF } from "../loader/pdfLoader.js";
// import { parsePDF } from "../parser/pdfParser.js";
import { createEmbedding } from "../embeddings/openaiEmbedding.js";
import { loadDocument } from "../loader/documentLoader.js";
import { createCollection } from "../qdrant/createCollection.js";
import { uploadVectors } from "../qdrant/uploadVectors.js";

export async function ingestDocuments(folderPath, notebookId) {
  try {
    console.log("Scanning transcripts...");

    const transcriptFiles = await scanDirectory(folderPath);
    console.log("========== SCANNED FILES ==========");
    console.log(transcriptFiles);

    console.log(`Found ${transcriptFiles.length} transcript files`);

    const loadedTranscripts = await loadTranscripts(transcriptFiles);
    console.log("========== LOADED FILES ==========");
    console.log(loadedTranscripts);
    console.log("Calling createCollection...");
    await createCollection();

    let id = 1;
    let points = [];

    const BATCH_SIZE = 100;


    for (const transcript of loadedTranscripts) {
      console.log(`Processing: ${transcript.fileName}`);
      console.log("=================================");
      console.log("Processing:", transcript.fileName);
      console.log("Extension:", transcript.extension);

        //   const parsed = parseTranscript(transcript);
        //   const chunks = createChunks(parsed);
        let chunks = [];
        if (transcript.extension === ".srt" || transcript.extension === ".vtt") {
            const parsed = parseTranscript(transcript);
            chunks = createChunks(parsed);
        } else {
        const documents = await loadDocument(transcript.absolutePath);
        console.log("DOCUMENTS:");
        console.dir(documents, { depth: null });
        chunks = documents.map((doc) => ({
            lesson: transcript.fileName,
            source: transcript.relativePath,
            page: doc.metadata?.loc?.pageNumber ?? null,
            start: 0,
            end: 0,
            type: doc.metadata?.type || "document",
            text: doc.pageContent,
        })
    );
    }
      for (const chunk of chunks) {
        const enrichedChunk = extractMetadata(chunk);

        const embedding = await createEmbedding(enrichedChunk.text);

        console.log(`Embedding: ${enrichedChunk.lesson}`);

        points.push({
          id: id++,
          vector: embedding,
          payload: {
            ...enrichedChunk,
            notebookId,
          },
        });

        if (points.length >= BATCH_SIZE) {
          await uploadVectors(points);

          console.log(`Uploaded ${id - 1} vectors`);

          points = [];
        }
      }
    }

    if (points.length > 0) {
        console.log("===== POINTS TO UPLOAD =====");
        console.log(points.length);

        console.dir(points[0], { depth: null });
      await uploadVectors(points);
    }

    console.log(`Total vectors uploaded: ${id - 1}`);
    console.log("Ingestion completed successfully.");
  } catch (error) {
    console.error(error);
    throw error;
  }
}