import { Composer, Markup } from "telegraf";
import { setAccess } from "../access";

export default Composer.command("start", async (ctx) => {
  if (ctx.chat.type == "private") {
    const args = ctx.message.text.split(/\s/g);
    if (
      args.length == 2 &&
      args[1].startsWith("sak") &&
      args[1].slice(3, args[1].length).length != 0
    ) {
      await setAccess(ctx.from.id, args[1].slice(3, args[1].length));
      await ctx.reply("Credentials updated!");
      return;
    } else if (args.length == 2 && args[1] == "connect") {
      await ctx.reply(
        `1. Login to your Deezer account in your browser if you haven’t, otherwise move to the next step.
2. Visit https://tgcalls.net/deezer.
3. Click “Continue”, after that “Accept”.
4. That should return you to Telegram, once you’re there click “Start”.
5. Done, you now can use my /commands!`
      );
      return;
    }
    await ctx.reply(
      `I can let others know what you were listening to on Deezer.

Use /connect for steps on connecting your account or /commands to know my commands.`,
      {
        reply_markup: {
          inline_keyboard: [
            [Markup.button.switchToChat("Use me inline", "")],
            [
              {
                text: "Add me to a group",
                url: `https://t.me/${ctx.botInfo.username}?startgroup=start`,
              },
            ],
          ],
        },
      }
    );
  } else await ctx.reply("I’m on the go.");
});
