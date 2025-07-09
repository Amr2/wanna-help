package service

import (
	"core-service/model"
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

// POST /api/users/register
func RegisterUser(c *gin.Context, db *sql.DB, redis *redis.Client) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.ID = uuid.New().String()
	user.Password = string(hashedPassword)
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	query := `INSERT INTO users (id, email, password_hash, user_type, first_name, last_name, phone, location, is_verified, rating, created_at, updated_at) 
			  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

	_, err = db.Exec(query, user.ID, user.Email, user.Password, user.UserType, user.FirstName, user.LastName, user.Phone, user.Location, user.IsVerified, 0.0, user.CreatedAt, user.UpdatedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	user.Password = "" // Don't return password
	c.JSON(http.StatusCreated, user)
}

// POST /api/users/login
func LoginUser(c *gin.Context, db *sql.DB, redis *redis.Client) {
	var loginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user model.User
	query := `SELECT id, email, password_hash, user_type, first_name, last_name, phone, location, is_verified, rating, created_at, updated_at FROM users WHERE email = $1`
	err := db.QueryRow(query, loginData.Email).Scan(&user.ID, &user.Email, &user.Password, &user.UserType, &user.FirstName, &user.LastName, &user.Phone, &user.Location, &user.IsVerified, &user.Rating, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginData.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT token here (implement JWT logic)
	token := "1234567890" // You need to implement this generateJWT(user.ID)

	user.Password = "" // Don't return password
	c.JSON(http.StatusOK, gin.H{
		"user":  user,
		"token": token,
	})
}

// GET /api/users/profile/:id
func GetUserProfile(c *gin.Context, db *sql.DB, redis *redis.Client) {
	userID := c.Param("id")

	var user model.User
	query := `SELECT id, email, user_type, first_name, last_name, phone, location, is_verified, rating, created_at, updated_at FROM users WHERE id = $1`
	err := db.QueryRow(query, userID).Scan(&user.ID, &user.Email, &user.UserType, &user.FirstName, &user.LastName, &user.Phone, &user.Location, &user.IsVerified, &user.Rating, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// PUT /api/users/profile/:id
func UpdateUserProfile(c *gin.Context, db *sql.DB, redis *redis.Client) {
	userID := c.Param("id")
	var updateData model.User

	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updateData.UpdatedAt = time.Now()
	query := `UPDATE users SET first_name = $1, last_name = $2, phone = $3, location = $4, updated_at = $5 WHERE id = $6`
	_, err := db.Exec(query, updateData.FirstName, updateData.LastName, updateData.Phone, updateData.Location, updateData.UpdatedAt, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}