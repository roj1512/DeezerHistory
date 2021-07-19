import { Composer, InputFile, InlineKeyboard } from "grammy";
import { getHistory } from "../../history";
import { getAccess } from "../../models/access";
import generateImage from "../../image";
import { getReplyMarkup } from "../../helpers";
import env from "../../env";

const composer = new Composer();

composer.hears(new RegExp(`status(|@${env.USERNAME})`, "i"), async (ctx) => {
    if (!ctx.from || !ctx.message.text) {
        return;
    }

    const access = await getAccess(ctx.from.id);

    if (!access) {
        await ctx.reply(
            "You need to connect your Deezer account first. PM me and use the /connect command.",
            {
                reply_markup: new InlineKeyboard().url(
                    "PM me",
                    `https://t.me/${ctx.me.username}`,
                ),
            },
        );
        return;
    }

    var indent = parseInt(ctx.message.text.split(/\s/g)[1]);
    const history = await getHistory(access);

    if (!(indent - 1 in history)) indent = 0;
    else indent -= 1;

    const track = history[indent];

    await ctx.replyWithPhoto(
        new InputFile(
            await generateImage(
                track.album.cover_big,
                ctx.from.first_name,
                track.title,
                track.artist.name,
                track.album.title,
            ),
        ),
        { reply_markup: getReplyMarkup(track) },
    );
});

export default composer;
