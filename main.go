package main

import (
	"github.com/roj1512/DeezerHistory/database"
	"github.com/roj1512/DeezerHistory/env"
	"github.com/roj1512/DeezerHistory/handlers"
	"github.com/roj1512/DeezerHistory/photo"
	"github.com/roj1512/DeezerHistory/server"

	"github.com/PaulSonOfLars/gotgbot/v2"
	"github.com/PaulSonOfLars/gotgbot/v2/ext"
)

func main() {
	err := env.Initialize()
	if err != nil {
		panic(err)
	}
	err = database.Initialize()
	if err != nil {
		panic(err)
	}
	_, err = photo.Initialize()
	if err != nil {
		panic(err)
	}
	bot, err := gotgbot.NewBot(env.BotToken, nil)
	if err != nil {
		panic(err)
	}
	updater := ext.NewUpdater(nil)
	handlers.Add(updater.Dispatcher)
	err = updater.StartPolling(bot, nil)
	if err != nil {
		panic(err)
	}
	err = server.Start()
	if err != nil {
		panic(err)
	}
}
