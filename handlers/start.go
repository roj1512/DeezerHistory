package handlers

import (
	"fmt"
	"strings"

	"github.com/roj1512/DeezerHistory/database"
	"github.com/roj1512/DeezerHistory/env"
	"github.com/roj1512/DeezerHistory/helpers"

	"github.com/PaulSonOfLars/gotgbot/v2"
	"github.com/PaulSonOfLars/gotgbot/v2/ext"
)

const startText = `I can let others know what you were listening to on Deezer.

Use /connect for steps on connecting your account or /commands to know my commands.`

func startHandler(b *gotgbot.Bot, ctx *ext.Context) error {
	if ctx.EffectiveChat.Type != "private" {
		return nil
	}
	accessKey := helpers.GetAccessKey(ctx.EffectiveMessage.Text)
	if accessKey != "" {
		err := database.UpdateCredentials(&database.UserCredentials{
			UserID:    ctx.EffectiveUser.Id,
			AccessKey: accessKey,
		})
		if err != nil {
			return err
		}
		_, err = ctx.EffectiveMessage.Reply(b, "Updated your credentials!", nil)
		return err
	}
	text := startText
	if strings.HasSuffix(ctx.EffectiveMessage.Text, "connect") {
		text = fmt.Sprintf(connectText, env.ConnectionURL)
	}
	_, err := ctx.EffectiveMessage.Reply(b, text, nil)
	return err
}
