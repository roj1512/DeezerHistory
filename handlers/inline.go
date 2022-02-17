package handlers

import (
	"dh/api"
	"dh/env"
	"dh/helpers"
	"dh/photo"
	"errors"
	"strconv"
	"strings"

	"github.com/PaulSonOfLars/gotgbot/v2"
	"github.com/PaulSonOfLars/gotgbot/v2/ext"
	"github.com/google/uuid"
)

func inlineHandler(b *gotgbot.Bot, ctx *ext.Context) error {
	tracks, err := api.FetchHistory(ctx.EffectiveUser.Id)
	if err != nil {
		if errors.Is(err, api.ErrNotAuthorized) {
			_, err = ctx.InlineQuery.Answer(
				b,
				[]gotgbot.InlineQueryResult{},
				&gotgbot.AnswerInlineQueryOpts{CacheTime: 0, IsPersonal: true, SwitchPmText: "Authorize", SwitchPmParameter: "connect"},
			)
			return err
		}
		return err
	}
	if len(tracks) == 0 {
		_, err = ctx.InlineQuery.Answer(b, []gotgbot.InlineQueryResult{gotgbot.InlineQueryResultArticle{
			Id:    uuid.NewString(),
			Title: "Your history is empty!",
			InputMessageContent: gotgbot.InputTextMessageContent{
				MessageText: "My history is empty!",
			},
		}}, nil)
		return err
	}
	indent := 0
	args := strings.Fields(ctx.InlineQuery.Query)
	if len(args) > 0 {
		indent, _ = strconv.Atoi(args[0])
	}
	indent = helpers.EnsureIndent(indent, len(tracks))
	track := tracks[indent]
	photo, err := photo.Generate(track.Artist.Name, track.Album.CoverBig, track.Artist.Name, track.Title, ctx.EffectiveUser.FirstName)
	if err != nil {
		return err
	}
	msg, err := b.SendPhoto(env.LogChatID, photo, nil)
	if err != nil {
		return err
	}
	_, err = ctx.InlineQuery.Answer(
		b,
		[]gotgbot.InlineQueryResult{
			gotgbot.InlineQueryResultCachedPhoto{
				Id:          uuid.NewString(),
				PhotoFileId: msg.Photo[len(msg.Photo)-1].FileId,
				Title:       track.Title,
				Description: track.Artist.Name,
				ReplyMarkup: helpers.GetReplyMarkup(track),
			},
		},
		&gotgbot.AnswerInlineQueryOpts{
			CacheTime:  30,
			IsPersonal: true,
		},
	)
	return err
}
