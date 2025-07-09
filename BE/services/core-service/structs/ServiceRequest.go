package structs

import (
	"time"

	_ "github.com/lib/pq"
)

type ServiceRequest struct {
	ID              string    `json:"id" db:"id"`
	RequesterID     string    `json:"requester_id" db:"requester_id"`
	Title           string    `json:"title" db:"title"`
	Description     string    `json:"description" db:"description"`
	Category        string    `json:"category" db:"category"`
	BudgetRange     string    `json:"budget_range" db:"budget_range"`
	Location        string    `json:"location" db:"location"`
	Status          string    `json:"status" db:"status"`     // active, in_progress, completed, cancelled
	Priority        string    `json:"priority" db:"priority"` // low, medium, high, urgent
	RequiredSkills  []string  `json:"required_skills" db:"required_skills"`
	Deadline        time.Time `json:"deadline" db:"deadline"`
	CreatedAt       time.Time `json:"created_at" db:"created_at"`
	ExpiresAt       time.Time `json:"expires_at" db:"expires_at"`
	ActiveBidsCount int       `json:"active_bids_count" db:"active_bids_count"`
	TotalBidsCount  int       `json:"total_bids_count" db:"total_bids_count"`
	IsFree          bool      `json:"is_free" db:"is_free"`
}
