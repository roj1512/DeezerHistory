import { Bot } from "https://deno.land/x/grammy/mod.ts";
import handlers from "./handlers/mod.ts";
import env from "./env.ts";

const bot = new Bot(env.BOT_TOKEN);

bot.use(handlers);
bot.catch(console.log);

bot.start({ drop_pending_updates: true });
