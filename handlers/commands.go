package handlers

import (
	"github.com/PaulSonOfLars/gotgbot/v2"
	"github.com/PaulSonOfLars/gotgbot/v2/ext"
)

const commandsText = `<b>Private</>
/connect - get steps on connecting your Deezer account.
/commands - send this list.

<b>Groups</>
/status - show others what you were listening to, pass a number to show a different track.

<b>Inline</>
You can always use me inline to do the same thing /status does but in anywhere and without adding me.
Type @DeezerHistoryBot in the message box, pass a number to get a different track.`

func commandsHandler(b *gotgbot.Bot, ctx *ext.Context) error {
	if ctx.EffectiveChat.Type != "private" {
		return nil
	}
	_, err := ctx.EffectiveMessage.Reply(b, commandsText, &gotgbot.SendMessageOpts{ParseMode: "HTML"})
	return err
}
