import { Telegraf } from "telegraf";
import addHandlers from "./handlers";

const bot = new Telegraf("1448511240:AAHPHZEJqziWDS14fFg1E4Uxh36Kp0tY5iA");
addHandlers(bot);
(async () => {
  await bot.launch({ dropPendingUpdates: true });
})();
