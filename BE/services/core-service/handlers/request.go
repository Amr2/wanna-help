package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func RegisterRequestRoutes(r *gin.Engine, db *sql.DB, redis *redis.Client) {
	requests := r.Group("/api/requests")
	{
		requests.POST("", func(c *gin.Context) { /* TODO: implement */ })
		requests.GET("", func(c *gin.Context) { /* TODO: implement */ })
		requests.GET(":id", func(c *gin.Context) { /* TODO: implement */ })
		requests.PUT(":id", func(c *gin.Context) { /* TODO: implement */ })
		requests.DELETE(":id", func(c *gin.Context) { /* TODO: implement */ })
	}
}
