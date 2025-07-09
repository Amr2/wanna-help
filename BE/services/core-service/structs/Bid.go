package structs

import (
	"time"

	_ "github.com/lib/pq"
)

type Bid struct {
	ID          string    `json:"id" db:"id"`
	RequestID   string    `json:"request_id" db:"request_id"`
	ProviderID  string    `json:"provider_id" db:"provider_id"`
	Amount      float64   `json:"amount" db:"amount"`
	Description string    `json:"description" db:"description"`
	Status      string    `json:"status" db:"status"` // active, accepted, rejected, archived
	Proposal    string    `json:"proposal" db:"proposal"`
	Timeline    string    `json:"timeline" db:"timeline"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}
