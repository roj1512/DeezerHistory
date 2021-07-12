import { join, dirname } from "path";
import takeScreenshot from "./takeScreenshot";

const fullFilePath = join(
    dirname(dirname(__dirname)),
    "assets",
    "html",
    "index.html",
);

export default (
    image: string,
    user: string,
    title: string,
    artist: string,
    album: string,
) => takeScreenshot(fullFilePath, { image, user, title, artist, album });
