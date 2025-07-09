package main

import (
	"core-service/db"
	"core-service/handlers"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize DB and Redis
	dbConn := db.InitPostgres()
	redisClient := db.InitRedis()

	r := gin.Default()

	handlers.RegisterRoutes(r, dbConn, redisClient)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Printf("Service running on port %s", port)
	r.Run(":" + port)
}
