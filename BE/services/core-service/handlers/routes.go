package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func RegisterRoutes(r *gin.Engine, db *sql.DB, redis *redis.Client) {
	// User routes
	RegisterUserRoutes(r, db, redis)
	// Service request routes
	RegisterRequestRoutes(r, db, redis)
	// Bid routes
	RegisterBidRoutes(r, db, redis)
	// Agreement routes
	RegisterAgreementRoutes(r, db, redis)
	// Rating routes
	RegisterRatingRoutes(r, db, redis)
	// Payment routes (if needed)
	// RegisterPaymentRoutes(r, db, redis)
}
