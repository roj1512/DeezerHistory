import { Composer } from "grammy";
import env from "../../env";

const composer = new Composer();

const connectMessage = `1. Login to your Deezer account in your browser if you haven’t, otherwise move to the next step.
2. Visit ${env.CONNECT}.
3. Click “Continue”, after that “Accept”.
4. That should return you to Telegram, once you’re there click “Start”.
5. Done, you now can use my /commands!`;

composer.command("connect", (ctx) => ctx.reply(connectMessage));

composer
    .filter((ctx) => Boolean(ctx.message?.text?.includes("start connect")))
    .use((ctx) => ctx.reply(connectMessage));

export default composer;
