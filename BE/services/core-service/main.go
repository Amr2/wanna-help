package main

import (
	"core-service/handlers"
	"core-service/repository"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize DB and Redis
	redisClient := repository.InitRedis()
	dbConn := repository.InitPostgres()

	r := gin.Default()

	handlers.RegisterRoutes(r, dbConn, redisClient)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Printf("Service running on port %s", port)
	r.Run(":" + port)
}
