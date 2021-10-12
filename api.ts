import { Track } from "./types.ts";

export const getHistory = async (accessToken: string): Promise<Track[]> => {
  const result = await (
    await fetch(
      `https://api.deezer.com/user/me/history?access_token=${accessToken}`
    )
  ).json();

  if ("error" in result) {
    throw new Error(`${result.error.type}: ${result.error.type}`);
  }

  return result.data;
};
