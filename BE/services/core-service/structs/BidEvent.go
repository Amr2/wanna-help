package structs

type BidEvent struct {
	RequestID  string  `json:"request_id"`
	ProviderID string  `json:"provider_id"`
	Amount     float64 `json:"amount"`
	Message    string  `json:"message"`
}