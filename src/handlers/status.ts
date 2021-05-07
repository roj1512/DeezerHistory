import { Composer } from "grammy";
import { getHistory } from "../history";
import { getAccess } from "../access";
import { getImage } from "../image";
import { getReplyMarkup } from "../helpers";

export default new Composer().command("status", async (ctx) => {
  if (ctx.chat.type == "private" || !ctx.from || !ctx.message) {
    await ctx.reply("You should send this in a group!");
    return;
  }
  const access = await getAccess(ctx.from.id);
  if (access === "") {
    await ctx.reply(
      "You need to connect your Deezer account first. PM me and use the /connect command.",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "PM me",
                url: `https://t.me/${ctx.me.username}`,
              },
            ],
          ],
        },
      }
    );
    return;
  }
  var indent = parseInt(ctx.message.text.split(/\s/g)[1]);
  const history = await getHistory(access);
  if (!(indent - 1 in history)) indent = 0;
  else indent -= 1;
  const track = history[indent];
  await ctx.replyWithPhoto(
    {
      file: await getImage(
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
