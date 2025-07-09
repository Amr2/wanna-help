package model

import (
	"time"

	_ "github.com/lib/pq"
)

type Payment struct {
	ID            string    `json:"id" db:"id"`
	AgreementID   string    `json:"agreement_id" db:"agreement_id"`
	PayerID       string    `json:"payer_id" db:"payer_id"`
	PayeeID       string    `json:"payee_id" db:"payee_id"`
	Amount        float64   `json:"amount" db:"amount"`
	Status        string    `json:"status" db:"status"` // pending, completed, failed, refunded
	PaymentMethod string    `json:"payment_method" db:"payment_method"`
	TransactionID string    `json:"transaction_id" db:"transaction_id"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	ProcessedAt   time.Time `json:"processed_at" db:"processed_at"`
}
