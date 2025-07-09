package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func RegisterRatingRoutes(r *gin.Engine, db *sql.DB, redis *redis.Client) {
	ratings := r.Group("/api/ratings")
	{
		ratings.POST("", func(c *gin.Context) { /* TODO: implement */ })
		ratings.GET("/user/:userId", func(c *gin.Context) { /* TODO: implement */ })
	}
}
