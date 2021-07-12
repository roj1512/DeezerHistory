import { Composer } from "grammy";
import start from "./start";
import inline from "./inline";
import status from "./status";
import connect from "./connect";
import commands from "./commands";
import setAccess from "./setAccess";

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
