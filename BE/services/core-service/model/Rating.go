package model

import (
	"time"

	_ "github.com/lib/pq"
)

type Rating struct {
	ID          string    `json:"id" db:"id"`
	AgreementID string    `json:"agreement_id" db:"agreement_id"`
	FromUserID  string    `json:"from_user_id" db:"from_user_id"`
	ToUserID    string    `json:"to_user_id" db:"to_user_id"`
	Rating      int       `json:"rating" db:"rating"`
	Review      string    `json:"review" db:"review"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
