package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/roj1512/DeezerHistory/database"

	"gorm.io/gorm"
)

var (
	ErrDeezerSide    = errors.New("error on Deezer")
	ErrNotAuthorized = errors.New("not authorized")
)

type Error struct {
	Type string `json:"string"`
}

type Album struct {
	Title    string `json:"title"`
	CoverBig string `json:"cover_big"`
	Link     string `json:"link"`
}

type Artist struct {
	Name string
}

type Track struct {
	Title  string
	Artist Artist `json:"artist"`
	Album  Album  `json:"album"`
	Link   string `json:"link"`
}

type Response struct {
	Error Error   `json:"error"`
	Data  []Track `json:"data"`
}

func FetchHistory(userId int64) ([]Track, error) {
	creds, err := database.GetCredentials(userId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrNotAuthorized
		}
		return nil, err
	}
	values := url.Values{}
	values.Set("access_token", creds.AccessKey)
	res, err := http.Get(fmt.Sprintf("https://api.deezer.com/user/me/history?%s", values.Encode()))
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	response := Response{}
	err = json.Unmarshal(data, &response)
	if err != nil {
		return nil, err
	}
	if response.Error.Type != "" {
		return nil, ErrDeezerSide
	}
	return response.Data, nil
}
