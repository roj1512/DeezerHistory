import { Composer } from "grammy";

const composer = new Composer();

composer.command("connect", async (ctx) => {
    if (ctx.chat.type != "private") return;
    await ctx.reply(
        `1. Login to your Deezer account in your browser if you haven’t, otherwise move to the next step.
2. Visit https://tgcalls.net/deezer.
3. Click “Continue”, after that “Accept”.
4. That should return you to Telegram, once you’re there click “Start”.
5. Done, you now can use my /commands!`
    );
});

export default composer;
