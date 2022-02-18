package handlers

import (
	"fmt"

	"github.com/roj1512/DeezerHistory/env"

	"github.com/PaulSonOfLars/gotgbot/v2"
	"github.com/PaulSonOfLars/gotgbot/v2/ext"
)

const connectText = `1. Login to your Deezer account in your browser if you haven’t, otherwise move to the next step.
2. Visit %s.
3. Click “Continue”, after that “Accept”.
4. That should return you to Telegram, once you’re there click “Start”.
5. Done, you now can use my /commands!`

func connectHandler(b *gotgbot.Bot, ctx *ext.Context) error {
	if ctx.EffectiveChat.Type != "private" {
		return nil
	}
	_, err := ctx.EffectiveMessage.Reply(b, fmt.Sprintf(connectText, env.ConnectionURL), nil)
	return err
}
