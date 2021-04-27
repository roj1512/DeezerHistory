require("dotenv").config();
const path = require("path");
const app = require("express")();
const { getImage } = require("./image");
const port = parseInt(process.env.IMAGE_SERVER_PORT);
const url = `file://${path.join(__dirname, "www", "index.html")}`;

app.get("/image", async (req, res) => {
  if (
    "image" in req.query &&
    "user" in req.query &&
    "title" in req.query &&
    "artist" in req.query &&
    "album" in req.query &&
    "bot" in req.query
  ) {
    res.setHeader("Content-Type", "image/jpeg");
    res.send(
      await getImage(
        url,
        req.query.image,
        req.query.user,
        req.query.title,
        req.query.artist,
        req.query.album,
        req.query.bot
      )
    );
  } else res.json({ error: "image, user, title, artist, album and bot are required" });
});

app.listen(port);
