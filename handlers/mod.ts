import { Composer } from "https://deno.land/x/grammy/mod.ts";
import start from "./start.ts";
import inline from "./inline.ts";
import status from "./status.ts";
import connect from "./connect.ts";
import commands from "./commands.ts";
import setAccess from "./setAccess.ts";

const composer = new Composer();

composer
  .filter((ctx) => {
    const args = ctx.message?.text?.split(/\s/g);
    return (
      !!args &&
      args.length == 2 &&
      args[1].startsWith("sak") &&
      args[1].slice(3, args[1].length).length != 0
    );
  })
  .use(setAccess);

composer
  .filter((ctx) => ctx.chat?.type == "private")
  .use(commands)
  .use(connect);

composer
  .filter((ctx) => !!ctx.chat?.type && ctx.chat.type.includes("group"))
  .use(status);

composer.use(start);
composer.use(inline);

export default composer;
