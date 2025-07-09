package events

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "os"

    "github.com/redis/go-redis/v9"
)

var ctx = context.Background()

type BidEvent struct {
    RequestID  string  `json:"request_id"`
    ProviderID string  `json:"provider_id"`
    Amount     float64 `json:"amount"`
    Message    string  `json:"message"`
}

func EmitBidCreated(event BidEvent) {
    redisUrl := os.Getenv("REDIS_URL")
    if redisUrl == "" {
        redisUrl = "localhost:6379"
    }

    rdb := redis.NewClient(&redis.Options{
        Addr: redisUrl,
    })

    payload, err := json.Marshal(event)
    if err != nil {
        log.Fatalf("Failed to marshal event: %v", err)
    }

    err = rdb.Publish(ctx, "bid.created", payload).Err()
    if err != nil {
        log.Fatalf("Failed to publish event: %v", err)
    }

    fmt.Println("✅ Published bid.created event")
}
