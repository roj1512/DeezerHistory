import { Telegraf } from "telegraf";
import start from "./start";
import status from "./status";
import commands from "./commands";
import connect from "./connect";
import inline from "./inline";
import error from "./error";

export default (bot: Telegraf): void => {
  bot.use(start);
  bot.use(status);
  bot.use(commands);
  bot.use(connect);
  bot.use(inline);
  bot.use(error);
};
