import { Composer, InlineKeyboard } from "https://deno.land/x/grammy/mod.ts";

const composer = new Composer();

composer.command("start", async (ctx) => {
  if (ctx.chat.type != "private") {
    return ctx.reply("I’m alive!");
  }

  return await ctx.reply(
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
});

export default composer;
