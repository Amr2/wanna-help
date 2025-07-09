package model

import (
	"time"

	_ "github.com/lib/pq"
)

type Agreement struct {
	ID            string    `json:"id" db:"id"`
	RequestID     string    `json:"request_id" db:"request_id"`
	ProviderID    string    `json:"provider_id" db:"provider_id"`
	RequesterID   string    `json:"requester_id" db:"requester_id"`
	AgreedAmount  float64   `json:"agreed_amount" db:"agreed_amount"`
	Status        string    `json:"status" db:"status"` // agreed, in_progress, completed, disputed
	Terms         string    `json:"terms" db:"terms"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	CompletedAt   time.Time `json:"completed_at" db:"completed_at"`
	PaymentStatus string    `json:"payment_status" db:"payment_status"`
}
