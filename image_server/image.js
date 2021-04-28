const core = require("puppeteer-core");
var browser, page;

(async () => {
  browser = await core.launch({ executablePath: "/usr/bin/google-chrome" });
  page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 500 });
})();

const getImage = async (url, image, user, title, artist, album) => {
  await page.goto(
    `${url}?image=${encodeURIComponent(image)}&user=${encodeURIComponent(
      user
    )}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(
      artist
    )}&album=${encodeURIComponent(album)}`
  );
  return await page.screenshot();
};

module.exports.getImage = getImage;
