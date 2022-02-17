package photo

import (
	"context"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path"

	"github.com/chromedp/chromedp"
)

var ctx context.Context
var cancel context.CancelFunc
var address string

func Initialize() (bool, error) {
	if ctx == nil {
		ctx, cancel = chromedp.NewContext(context.Background())
		wd, err := os.Getwd()
		if err != nil {
			return false, err
		}
		address = fmt.Sprintf("file://%s", path.Join(wd, "public", "index.html"))
		return true, nil
	}
	return false, nil
}

func Cancel() bool {
	if cancel == nil {
		return false
	}
	cancel()
	return true
}

func Generate(albumName string, albumPhoto string, artist string, title string, user string) ([]byte, error) {
	photo := []byte{}
	if ctx == nil {
		return photo, errors.New("not initialized")
	}
	query := url.Values{}
	query.Set("albumName", albumName)
	query.Set("albumPhoto", albumPhoto)
	query.Set("artist", artist)
	query.Set("title", title)
	query.Set("user", user)
	return photo, chromedp.Run(ctx, chromedp.Tasks{
		chromedp.Navigate(fmt.Sprintf("%s?%s", address, query.Encode())),
		chromedp.Screenshot("main", &photo, chromedp.NodeVisible),
	})
}
