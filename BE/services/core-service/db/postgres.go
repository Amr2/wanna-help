package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func InitPostgres() *sql.DB {
	dsn := os.Getenv("POSTGRES_DSN")
	if dsn == "" {
		dsn = "host=localhost port=5432 user=postgres password=postgres dbname=wannahelp sslmode=disable"
	}
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to Postgres: %v", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping Postgres: %v", err)
	}
	return db
}
