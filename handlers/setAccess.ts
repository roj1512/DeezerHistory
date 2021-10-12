import { Composer } from "https://deno.land/x/grammy/mod.ts";
import { setAccessToken } from "../db.ts";

const composer = new Composer();

composer.use(async (ctx) => {
  const args = ctx.message?.text?.split(/\s/g);

  if (ctx.from && args) {
    await setAccessToken(ctx.from.id, args[1].slice(3, args[1].length));
    await ctx.reply("Credentials updated!");
  }
});

export default composer;
