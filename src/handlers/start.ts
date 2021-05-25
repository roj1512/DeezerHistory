import { Composer, InlineKeyboard } from "grammy";
import { setAccess } from "../access";

const composer = new Composer();

composer.command("start", async (ctx) => {
    if (ctx.chat?.type == "private" && ctx.from) {
        const args = ctx.message?.text.split(/\s/g);
        if (
            args.length == 2 &&
            args[1].startsWith("sak") &&
            args[1].slice(3, args[1].length).length != 0
        ) {
            await setAccess(ctx.from.id, args[1].slice(3, args[1].length));
            await ctx.reply("Credentials updated!");
            return;
        }
        await ctx.reply(
            `I can let others know what you were listening to on Deezer.

Use /connect for steps on connecting your account or /commands to know my commands.`,
            {
                reply_markup: new InlineKeyboard()
                    .switchInline("Use me inline")
                    .row()
                    .url(
                        "Add me to a group",
                        `https://t.me/${ctx.me.username}?startgroup=start`
                    ),
            }
        );
    } else await ctx.reply("I’m on the go.");
});

export default composer;
