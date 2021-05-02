import { Composer } from "telegraf";
import { getHistory } from "../history";
import { getAccess } from "../access";
import { getImage } from "../image";
import { getReplyMarkup } from "../helpers";

export default Composer.command("status", async (ctx) => {
  if (ctx.chat.type == "private") {
    await ctx.reply("You should send this in a group!");
    return;
  }
  var access: string;
  try {
    access = await getAccess(ctx.from.id);
  } catch (err) {
    if (err.message === "Not authorized") {
      await ctx.reply(
        "You need to connect your Deezer account first. PM me and use the /connect command.",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "PM me",
                  url: `https://t.me/${ctx.botInfo.username}`,
                },
              ],
            ],
          },
        }
      );
      return;
    }
    await ctx.reply(err.toString());
    return;
  }
  var indent = parseInt(ctx.message.text.split(/\s/g)[1]);
  const history = await getHistory(access);
  if (!(indent - 1 in history)) indent = 0;
  else indent -= 1;
  const track = history[indent];
  await ctx.replyWithPhoto(
    {
      source: await getImage(
        track.album.cover_big,
        ctx.from.first_name,
        track.title,
        track.artist.name,
        track.album.title
      ),
    },
    { reply_markup: getReplyMarkup(track) }
  );
});
