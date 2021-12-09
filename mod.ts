import { startServer } from "./server.ts";
import { startBot } from "./bot.ts";

await Promise.all([startServer, startBot]);
