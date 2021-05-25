import { Bot } from "grammy";
import { run } from "@grammyjs/runner";
import addHandlers from "./handlers";
import { botToken } from "./config";

const bot = new Bot(botToken);
addHandlers(bot);
bot.catch((botError) => console.log(botError.error));
run(bot);
