import "https://deno.land/x/dotenv/load.ts";
import { cleanEnv, num, str } from "https://deno.land/x/envalid/mod.ts";

export default cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str(),
  BOT_USERNAME: str(),
  CACHE_CHAT_ID: num(),
  CONNECTION_URL: str(),
  CHROMIUM_PATH: str(),
  DATABASE_FILE: str({ default: "database.sqlite" }),
  APP_ID: num(),
  APP_SECRET: str(),
  APP_REDIR_URL: str(),
  APP_PERMISSIONS: str(),
});
