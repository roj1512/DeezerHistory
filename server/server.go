package server

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/roj1512/DeezerHistory/env"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func Start() error {
	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		code := c.Query("code")
		if code == "" {
			return c.Redirect("/auth")
		}
		values := url.Values{}
		values.Set("app_id", env.AppID)
		values.Set("secret", env.AppSecret)
		values.Set("code", code)
		res, err := http.Get(fmt.Sprintf("https://connect.deezer.com/oauth/access_token.php?%s", values.Encode()))
		if err != nil {
			return err
		}
		defer res.Body.Close()
		data, err := ioutil.ReadAll(res.Body)
		if err != nil {
			return err
		}
		values, err = url.ParseQuery(string(data))
		if err != nil {
			return err
		}
		start := fmt.Sprintf("sak%s", values.Get("access_token"))
		values = url.Values{}
		values.Set("start", start)
		return c.Redirect(fmt.Sprintf("https://t.me/%s?%s", env.BotUsername, values.Encode()))
	})
	app.Get("/auth", func(c *fiber.Ctx) error {
		values := url.Values{}
		values.Set("app_id", env.AppID)
		values.Set("redirect_uri", env.AppRedirectURL)
		values.Set("perms", env.AppPermissions)
		values.Set("state", uuid.NewString())
		return c.Redirect(fmt.Sprintf("https://connect.deezer.com/oauth/auth.php?%s", values.Encode()))
	})
	addr := env.ServerAddress
	if addr == "" {
		addr = ":9090"
	}
	return app.Listen(addr)
}
