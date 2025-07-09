package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func RegisterAgreementRoutes(r *gin.Engine, db *sql.DB, redis *redis.Client) {
	agreements := r.Group("/api/agreements")
	{
		agreements.GET("/user/:userId", func(c *gin.Context) { /* TODO: implement */ })
		agreements.POST(":id/complete", func(c *gin.Context) { /* TODO: implement */ })
	}
}
