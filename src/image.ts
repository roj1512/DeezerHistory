import { access } from "fs";
import path from "path";
import { encode } from "querystring";
import core from "puppeteer-core";

var browser: core.Browser;
var executablePath = "/usr/bin/chromium";
const url = `file://${path.join(
  path.dirname(__dirname),
  "static",
  "html",
  "index.html"
)}`;
access(executablePath, (err) => {
  if (err) executablePath = "/usr/bin/google-chrome";
});
const getBrowser = async (): Promise<core.Browser> => {
  if (typeof browser !== "undefined") return browser;
  browser = await core.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: executablePath,
    headless: true,
  });
  return browser;
};
export const getImage = async (
  image: string,
  user: string,
  title: string,
  artist: string,
  album: string
): Promise<Buffer> => {
  const page = await (await getBrowser()).newPage();
  await page.setViewport({ width: 1300, height: 500 });
  await page.goto(
    `${url}?${encode({
      image: image,
      user: user,
      title: title,
      artist: artist,
      album: album,
    })}`
  );
  const screenshot = await page.screenshot();
  await page.close();
  return screenshot;
};
