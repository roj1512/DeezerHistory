import { Bot } from "https://deno.land/x/grammy/mod.ts";
import { app } from "./server.ts";
import handlers from "./handlers/mod.ts";
import env from "./env.ts";

const bot = new Bot(env.BOT_TOKEN);

bot.use(handlers);
bot.catch(console.log);

app.listen({ port: 3000 });
bot.start({ drop_pending_updates: true });
