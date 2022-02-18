package env

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var (
	AppID          string
	AppPermissions string
	AppRedirectURL string
	AppSecret      string
	BotToken       string
	BotUsername    string
	CacheChatID    int64
	ConnectionURL  string
	ServerAddress  string
)

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
	CacheChatID, err = strconv.ParseInt(os.Getenv("CACHE_CHAT_ID"), 10, 64)
	if err != nil {
		return err
	}
	ConnectionURL = os.Getenv("CONNECTION_URL")
	ServerAddress = os.Getenv("SERVER_ADDRESS")
	return nil
}
