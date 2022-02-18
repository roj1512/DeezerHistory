package database

import (
	"errors"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var (
	db *gorm.DB

	ErrNotInitialized = errors.New("not initialized")
)

type UserCredentials struct {
	UserID    int64 `gorm:"primaryKey;autoIncrement:false"`
	AccessKey string
}

func Initialize() error {
	var err error
	db, err = gorm.Open(sqlite.Open("credentials.db"))
	if err != nil {
		return err
	}
	return db.AutoMigrate(&UserCredentials{})
}

func UpdateCredentials(credentials *UserCredentials) error {
	if db == nil {
		return ErrNotInitialized
	}
	return db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "user_id"}},
		DoUpdates: clause.AssignmentColumns([]string{"access_key"}),
	}).Create(credentials).Error
}

func GetCredentials(userId int64) (*UserCredentials, error) {
	credentials := &UserCredentials{}
	if db == nil {
		return credentials, ErrNotInitialized
	}
	return credentials, db.First(credentials, userId).Error
}
