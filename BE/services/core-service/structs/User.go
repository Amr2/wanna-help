package structs

import (
	"time"

	_ "github.com/lib/pq"
)

type User struct {
	ID         string    `json:"id" db:"id"`
	Email      string    `json:"email" db:"email"`
	Password   string    `json:"password,omitempty" db:"password_hash"`
	UserType   string    `json:"user_type" db:"user_type"` // requester, provider, both
	FirstName  string    `json:"first_name" db:"first_name"`
	LastName   string    `json:"last_name" db:"last_name"`
	Phone      string    `json:"phone" db:"phone"`
	Location   string    `json:"location" db:"location"`
	IsVerified bool      `json:"is_verified" db:"is_verified"`
	Rating     float32   `json:"rating" db:"rating"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" db:"updated_at"`
}
