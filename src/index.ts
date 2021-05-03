import { Telegraf } from "telegraf";
import addHandlers from "./handlers";
import { botToken } from "./config";

const bot = new Telegraf(botToken);
addHandlers(bot);
(async () => {
  await bot.launch({ dropPendingUpdates: true });
})();
