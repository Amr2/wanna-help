package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func RegisterBidRoutes(r *gin.Engine, db *sql.DB, redis *redis.Client) {
	bids := r.Group("/api/bids")
	{
		bids.POST("", func(c *gin.Context) { /* TODO: implement */ })
		bids.GET("/request/:requestId", func(c *gin.Context) { /* TODO: implement */ })
		bids.GET("/provider/:providerId", func(c *gin.Context) { /* TODO: implement */ })
		bids.POST(":id/accept", func(c *gin.Context) { /* TODO: implement */ })
		bids.POST(":id/reject", func(c *gin.Context) { /* TODO: implement */ })
	}
}
