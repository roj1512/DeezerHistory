import { config } from "dotenv";
config();
export const botToken: string = process.env.BOT_TOKEN || "";
export const dbUri: string = process.env.DB_URI || "mongodb://localhost:27017";
export const cacheChatId: number = parseInt(process.env.CACHE_CHAT_ID || "0");
