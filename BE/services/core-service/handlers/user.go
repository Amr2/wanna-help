package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func RegisterUserRoutes(r *gin.Engine, db *sql.DB, redis *redis.Client) {
	users := r.Group("/api/users")
	{
		users.POST("/register", func(c *gin.Context) {
			// Example implementation for registration
			// TODO: Move logic to service/user_service.go
			var user struct {
				Email     string `json:"email"`
				Password  string `json:"password"`
				UserType  string `json:"user_type"`
				FirstName string `json:"first_name"`
				LastName  string `json:"last_name"`
				Phone     string `json:"phone"`
				Location  string `json:"location"`
			}
			if err := c.ShouldBindJSON(&user); err != nil {
				c.JSON(400, gin.H{"error": err.Error()})
				return
			}
			// TODO: Call service layer to hash password, create user, etc.
			c.JSON(201, gin.H{"message": "User registered (stub)"})
		})
		users.POST("/login", func(c *gin.Context) { /* TODO: implement */ })
		users.GET("/profile/:id", func(c *gin.Context) { /* TODO: implement */ })
		users.PUT("/profile/:id", func(c *gin.Context) { /* TODO: implement */ })
	}
}
