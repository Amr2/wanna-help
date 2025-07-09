package db

import (
	"os"

	"github.com/go-redis/redis/v8"
)

func InitRedis() *redis.Client {
	redisUrl := os.Getenv("REDIS_URL")
	if redisUrl == "" {
		redisUrl = "localhost:6379"
	}
	return redis.NewClient(&redis.Options{
		Addr: redisUrl,
	})
}
