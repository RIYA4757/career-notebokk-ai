import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { searchVectors } from "../lib/retriever/searchVectors.js";

async function test() {
  const results = await searchVectors(
    "What is Expo?"
  );

  console.log(JSON.stringify(results, null, 2));
}

test();