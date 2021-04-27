const core = require("puppeteer-core");
var browser, page;

(async () => {
  browser = await core.launch({ executablePath: "/usr/bin/google-chrome" });
  page = await browser.newPage();
  await page.setViewport({ width: 640, height: 250 });
})();

const getImage = async (url, image, user, title, album, artist, bot) => {
  await page.goto(
    `${url}?image=${encodeURIComponent(image)}&user=${encodeURIComponent(
      user
    )}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(
      artist
    )}&album=${encodeURIComponent(album)}&bot=${encodeURIComponent(bot)}`
  );
  return await page.screenshot();
};

module.exports.getImage = getImage;
