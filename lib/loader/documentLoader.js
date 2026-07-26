import fs from "fs/promises";
import path from "path";
import { loadPpt } from "./pptLoader";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { loadImage } from "./imageLoader";

export async function loadDocument(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  let documents;

  switch (extension) {
    case ".pdf": {
      const loader = new PDFLoader(filePath);
      documents = await loader.load();
      break;
    }

    case ".docx": {
      const loader = new DocxLoader(filePath);
      documents = await loader.load();
      break;
    }

    case ".txt": {
      const text = await fs.readFile(filePath, "utf-8");
      documents = [
        {
          pageContent: text,
          metadata: {
            source: filePath,
          },
        },
      ];
      break;
    }
    case ".pptx": {
  return await loadPpt(filePath);
  }
    case ".png":
    case ".jpg":
    case ".jpeg": {
      return await loadImage(filePath);
    }

    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  return await splitter.splitDocuments(documents);
}