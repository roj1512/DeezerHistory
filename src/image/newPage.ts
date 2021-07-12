import newBrowser from "./newBrowser";

export default async () => {
    const page = await (await newBrowser()).newPage();
    await page.setViewport({ width: 1300, height: 500 });

    return page;
};
