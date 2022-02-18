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

var (
	address  string
	allocCtx context.Context
	ctx      context.Context

	ErrNotInitialized = errors.New("not initialized")
)

func Initialize() (bool, error) {
	if ctx == nil {
		allocCtx, _ = chromedp.NewExecAllocator(context.Background(), chromedp.Headless)
		ctx, _ = chromedp.NewContext(allocCtx)
		err := chromedp.Run(ctx)
		if err != nil {
			return false, err
		}
		wd, err := os.Getwd()
		if err != nil {
			return false, err
		}
		address = fmt.Sprintf("file://%s", path.Join(wd, "public", "index.html"))
		return true, nil
	}
	return false, nil
}

func Destroy() error {
	if ctx == nil {
		return ErrNotInitialized
	}
	err := chromedp.Cancel(ctx)
	if err != nil {
		return err
	}
	return chromedp.Cancel(allocCtx)
}

func Generate(albumName string, albumPhoto string, artist string, title string, user string) ([]byte, error) {
	photo := []byte{}
	if ctx == nil {
		return photo, ErrNotInitialized
	}
	tab, cancel := chromedp.NewContext(ctx)
	defer cancel()
	query := url.Values{}
	query.Set("albumName", albumName)
	query.Set("albumPhoto", albumPhoto)
	query.Set("artist", artist)
	query.Set("title", title)
	query.Set("user", user)
	return photo, chromedp.Run(tab, chromedp.Tasks{
		chromedp.Navigate(fmt.Sprintf("%s?%s", address, query.Encode())),
		chromedp.Screenshot("main", &photo, chromedp.NodeVisible),
	})
}
