package handlers

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/roj1512/DeezerHistory/api"
	"github.com/roj1512/DeezerHistory/helpers"
	"github.com/roj1512/DeezerHistory/photo"

	"github.com/PaulSonOfLars/gotgbot/v2"
	"github.com/PaulSonOfLars/gotgbot/v2/ext"
	"github.com/gotgbot/keyboard"
)

func statusHandler(b *gotgbot.Bot, ctx *ext.Context) error {
	tracks, err := api.FetchHistory(ctx.EffectiveUser.Id)
	if err != nil {
		if errors.Is(err, api.ErrNotAuthorized) {
			_, err := ctx.EffectiveMessage.Reply(b, "You’re not authorized!", &gotgbot.SendMessageOpts{
				ReplyMarkup: new(
					keyboard.InlineKeyboard,
				).Url(
					"Authorize",
					fmt.Sprintf("https://t.me/%s?start=connect", b.Username),
				).Build(),
			})
			return err
		}
		return err
	}
	if len(tracks) == 0 {
		_, err = ctx.EditedMessage.Reply(b, "Your history is empty!", nil)
		return err
	}
	indent := 0
	args := strings.Fields(ctx.EffectiveMessage.Text)
	if len(args) > 1 {
		indent, _ = strconv.Atoi(args[1])
	}
	indent = helpers.EnsureIndent(indent, len(tracks))
	track := tracks[indent]
	photo, err := photo.Generate(track.Album.Title, track.Album.CoverBig, track.Artist.Name, track.Title, ctx.EffectiveUser.FirstName)
	if err != nil {
		return err
	}
	_, err = b.SendPhoto(ctx.EffectiveChat.Id, photo, &gotgbot.SendPhotoOpts{
		ReplyMarkup: helpers.GetReplyMarkup(track),
	})
	return err
}
