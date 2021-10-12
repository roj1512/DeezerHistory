import { InlineKeyboard } from "https://deno.land/x/grammy/mod.ts";
import { Track } from "./types.ts";

export const getReplyMarkup = (track: Track): InlineKeyboard => {
  return new InlineKeyboard()
    .url("Play on Deezer", track.link)
    .url("Album", track.album.link)
    .row()
    .url("Share", `https://t.me/share/url?url=${track.link}`);
};
