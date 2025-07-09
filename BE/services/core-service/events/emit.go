package events

import (
	"context"
	"core-service/model"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

func EmitBidCreated(event model.BidEvent) {
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
