import { Composer } from "telegraf";
import { v4 } from "uuid";
import { getHistory } from "../history";
import { getAccess } from "../access";
import { getImage } from "../image";
import { getReplyMarkup } from "../helpers";
import { cacheChatId } from "../config";

export default Composer.on("inline_query", async (ctx) => {
  var access: string;
  try {
    access = await getAccess(ctx.from.id);
  } catch (err) {
    let text = err.message;
    if (err.message === "Not authorized") text = "Click here!";
    await ctx.answerInlineQuery([], {
      cache_time: 0,
      is_personal: true,
      switch_pm_text: text,
      switch_pm_parameter: "start",
    });
  }
  var indent = parseInt(ctx.inlineQuery.query.split(/\s/g)[0]);
  const history = await getHistory(await getAccess(ctx.from.id));
  if (!(indent - 1 in history)) indent = 0;
  else indent -= 1;
  const track = history[indent];
  const photo = (
    await ctx.telegram.sendPhoto(cacheChatId, {
      source: await getImage(
        track.album.cover_big,
        ctx.from.first_name,
        track.title,
        track.artist.name,
        track.album.title
      ),
    })
  ).photo;
  const file_id = photo[photo.length - 1].file_id;
  await ctx.answerInlineQuery(
    [
      {
        type: "photo",
        id: v4(),
        photo_file_id: file_id,
        title: track.title,
        description: track.artist.name,
        reply_markup: getReplyMarkup(track),
      },
    ],
    { cache_time: 0, is_personal: true }
  );
});
