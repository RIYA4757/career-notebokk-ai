import * as cheerio from "cheerio";

export async function loadWebsite(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch website.");
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    $("script").remove();
    $("style").remove();
    $("noscript").remove();

    const title = $("title").text().trim();

    const text = $("body").text().replace(/\s+/g, " ").trim();

    return {
      title: title || url,
      text,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load website.");
  }
}