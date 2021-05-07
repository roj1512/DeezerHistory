import { Bot } from "grammy";
import addHandlers from "./handlers";
import { botToken } from "./config";

const bot = new Bot(botToken);
addHandlers(bot);
bot.catch((botError) => console.log(botError.error));
bot.start({ drop_pending_updates: true });
