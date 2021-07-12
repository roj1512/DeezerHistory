import { launch } from "puppeteer";

export default () =>
    launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
    });
