package env

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var AppID string
var AppPermissions string
var AppRedirectURL string
var AppSecret string
var BotToken string
var BotUsername string
var ConnectionURL string
var LogChatID int64
var ServerAddress string

func Initialize() error {
	err := godotenv.Load()
	if err != nil {
		return err
	}
	AppID = os.Getenv("APP_ID")
	AppPermissions = os.Getenv("APP_PERMISSIONS")
	AppRedirectURL = os.Getenv("APP_REDIRECT_URL")
	AppSecret = os.Getenv("APP_SECRET")
	BotToken = os.Getenv("BOT_TOKEN")
	BotUsername = os.Getenv("BOT_USERNAME")
	ConnectionURL = os.Getenv("CONNECTION_URL")
	LogChatID, err = strconv.ParseInt(os.Getenv("LOG_CHAT_ID"), 10, 64)
	if err != nil {
		return err
	}
	ServerAddress = os.Getenv("SERVER_ADDRESS")
	return nil
}
