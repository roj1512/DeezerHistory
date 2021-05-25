import { Composer, InputFile } from "grammy";
import { v4 } from "uuid";
import { getHistory } from "../history";
import { getAccess } from "../access";
import { getImage } from "../image";
import { getReplyMarkup } from "../helpers";
import { cacheChatId } from "../config";

const composer = new Composer();

composer.on("inline_query", async (ctx) => {
    const access = await getAccess(ctx.from.id);
    if (access === "") {
        await ctx.answerInlineQuery([], {
            cache_time: 0,
            is_personal: true,
            switch_pm_text: "Click here!",
            switch_pm_parameter: "start",
        });
        return;
    }
    var indent = parseInt(ctx.inlineQuery.query.split(/\s/g)[0]);
    const history = await getHistory(access);
    if (!(indent - 1 in history)) indent = 0;
    else indent -= 1;
    const track = history[indent];
    const photo = (
        await ctx.api.sendPhoto(
            cacheChatId,
            new InputFile(
                await getImage(
                    track.album.cover_big,
                    ctx.from.first_name,
                    track.title,
                    track.artist.name,
                    track.album.title
                )
            )
        )
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

export default composer;
