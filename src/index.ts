import { Telegraf } from "telegraf";
import addHandlers from "./handlers";
import { botToken } from "./config";

const bot = new Telegraf(botToken);
addHandlers(bot);
bot.catch((error) => console.log(error));
(async () => {
  await bot.launch({ dropPendingUpdates: true });
})();
