import { InlineKeyboard } from "grammy";

export interface track {
    [key: string]: any;
}

export const getReplyMarkup = (track: track): InlineKeyboard => {
    return new InlineKeyboard()
        .url("Play on Deezer", track.link)
        .url("Album", track.album.link)
        .row()
        .url("Share", `https://t.me/share/url?url=${track.link}`);
};
