import { InlineKeyboardMarkup } from "@grammyjs/types";

export interface track {
  [key: string]: any;
}
export const getReplyMarkup = (track: track): InlineKeyboardMarkup => {
  return {
    inline_keyboard: [
      [
        { text: "Play on Deezer", url: track.link },
        { text: "Album", url: track.album.link },
      ],
      [{ text: "Share", url: `https://t.me/share/url?url=${track.link}` }],
    ],
  };
};
