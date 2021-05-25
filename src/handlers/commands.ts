import { Composer } from "grammy";

const composer = new Composer();

composer.command("commands", async (ctx) => {
    if (ctx.chat.type != "private") return;
    await ctx.reply(
        `<b>Private</>
/connect - get steps on connecting your Deezer account.
/commands - send this list.

<b>Groups</>
/status - show others what you were listening to, pass a number to show a different track.
Example usage:

<b>Inline</>
You can always use me inline to do the same thing /status does but in anywhere and without adding me.
Type @DeezerHistoryBot in the message box, pass a number to get a different track.`,
        { parse_mode: "HTML" }
    );
});

export default composer;
