import { encode, ParsedUrlQueryInput } from "querystring";
import newPage from "./newPage";

export default async (fullFilePath: string, params: ParsedUrlQueryInput) => {
    const page = await newPage();
    await page.goto(`file://${fullFilePath}?${encode(params)}`);

    const screenshot = (await page.screenshot()) as Buffer;
    await page.close();

    return screenshot;
};
