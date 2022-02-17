package handlers

import (
	"github.com/PaulSonOfLars/gotgbot/v2/ext"
	"github.com/PaulSonOfLars/gotgbot/v2/ext/handlers"
)

func Add(dp *ext.Dispatcher) {
	dp.AddHandler(handlers.NewCommand("commands", commandsHandler))
	dp.AddHandler(handlers.NewCommand("connect", connectHandler))
	dp.AddHandler(handlers.NewCommand("start", startHandler))
	dp.AddHandler(handlers.NewCommand("status", statusHandler))
	dp.AddHandler(handlers.NewInlineQuery(nil, inlineHandler))
}
