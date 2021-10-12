import { Composer, InputFile } from "https://deno.land/x/grammy/mod.ts";
import { getHistory } from "../api.ts";
import { getAccessToken } from "../db.ts";
import { generate } from "../image.ts";
import { getReplyMarkup } from "../utils.ts";
import env from "../env.ts";

const composer = new Composer();

composer.on("inline_query", async (ctx) => {
  const access = await getAccessToken(ctx.from.id);

  if (!access) {
    await ctx.answerInlineQuery([], {
      cache_time: 0,
      is_personal: true,
      switch_pm_text: "Click here!",
      switch_pm_parameter: "connect",
    });
    return;
  }

  let indent = Number(ctx.inlineQuery.query.split(/\s/g)[0]);
  const history = await getHistory(access);

  if (!(indent - 1 in history)) indent = 0;
  else indent -= 1;

  const track = history[indent];

  const photo = (
    await ctx.api.sendPhoto(
      env.CACHE_CHAT_ID,
      new InputFile(
        await generate(
          track.album.cover_big,
          ctx.from.first_name,
          track.title,
          track.artist.name,
          track.album.title
        )
      )
    )
  ).photo;

  await ctx.answerInlineQuery(
    [
      {
        type: "photo",
        id: String(Date.now()),
        photo_file_id: photo[photo.length - 1].file_id,
        title: track.title,
        description: track.artist.name,
        reply_markup: getReplyMarkup(track),
      },
    ],
    { cache_time: 30, is_personal: true }
  );
});

export default composer;
