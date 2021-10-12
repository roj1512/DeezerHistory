import {
  Composer,
  InputFile,
  InlineKeyboard,
} from "https://deno.land/x/grammy/mod.ts";
import { getHistory } from "../api.ts";
import { getAccessToken } from "../db.ts";
import { generate } from "../image.ts";
import { getReplyMarkup } from "../utils.ts";
import env from "../env.ts";

const composer = new Composer();

composer.hears(
  new RegExp(`^/(status|status@${env.BOT_USERNAME})$`, "i"),
  async (ctx) => {
    if (!ctx.from || !ctx.message.text) {
      return;
    }

    const access = await getAccessToken(ctx.from.id);

    if (!access) {
      await ctx.reply(
        "You need to connect your Deezer account first. PM me and use the /connect command.",
        {
          reply_markup: new InlineKeyboard().url(
            "PM me",
            `https://t.me/${ctx.me.username}`
          ),
        }
      );
      return;
    }

    let indent = Number(ctx.message.text.split(/\s/)[1]);
    const history = await getHistory(access);

    if (!(indent - 1 in history)) indent = 0;
    else indent -= 1;

    const track = history[indent];

    await ctx.replyWithPhoto(
      new InputFile(
        await generate(
          track.album.cover_big,
          ctx.from.first_name,
          track.title,
          track.artist.name,
          track.album.title
        )
      ),
      { reply_markup: getReplyMarkup(track) }
    );
  }
);

export default composer;
