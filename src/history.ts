import fetch from "node-fetch";
import { track } from "./helpers";

export const getHistory = async (access: any): Promise<track[]> => {
    const result = await (
        await fetch(
            `https://api.deezer.com/user/me/history?access_token=${access.access}`,
        )
    ).json();

    if ("error" in result)
        throw new Error(`${result.error.type}: ${result.error.type}`);
    else return result.data;
};
