import * as path from "https://deno.land/std@0.110.0/path/mod.ts";
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import env from "./env.ts";

const baseURL = path
  .join(path.dirname(import.meta.url), "assets", "html", "index.html")
  .replace("file:/", "file:///");

export async function generate(
  image: string,
  user: string,
  title: string,
  artist: string,
  album: string,
) {
  const browser = await puppeteer.launch({
    executablePath: env.CHROMIUM_PATH,
    headless: true,
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1300, height: 500 });

  const params = new URLSearchParams({ image, user, title, artist, album });
  const url = baseURL + "?" + params.toString();

  await page.goto(url);

  const screenshot = (await page.screenshot()) as Uint8Array;

  await page.close();
  await browser.close();
  return screenshot;
}
