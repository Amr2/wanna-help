package handlers

import (
	"core-service/service"
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func RegisterUserRoutes(r *gin.Engine, db *sql.DB, redis *redis.Client) {
	users := r.Group("/api/users")
	{
		users.POST("/register", func(c *gin.Context) {
			service.RegisterUser(c, db, redis)
		})
		users.POST("/login", func(c *gin.Context) {
			service.LoginUser(c, db, redis)
		})
		users.GET("/profile/:id", func(c *gin.Context) {
			service.GetUserProfile(c, db, redis)
		})
		users.PUT("/profile/:id", func(c *gin.Context) {
			service.UpdateUserProfile(c, db, redis)
		})
	}
}

