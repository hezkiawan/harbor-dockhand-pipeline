package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"
)

type DashboardMetrics struct {
	Budget          string `json:"budget"`
	CurrentUsage    string `json:"current_usage"`
	UpcomingUsage   string `json:"upcoming_usage"`
	TotalEstimation string `json:"total_estimation"`
	UsagePercent    int    `json:"usage_percent"`
	Contacts        int    `json:"contacts"`
	Broadcasts      int    `json:"broadcasts"`
}

var db *sql.DB

func initDB() {
	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	var err error
	for i := 0; i < 10; i++ {
		db, err = sql.Open("postgres", dsn)
		if err == nil && db.Ping() == nil {
			log.Println("Successfully connected to PostgreSQL database!")
			return
		}
		log.Println("Waiting for database to accept connections...")
		time.Sleep(2 * time.Second)
	}
	log.Fatalf("Could not connect to database: %v", err)
}

func getDashboard(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var m DashboardMetrics
	query := "SELECT budget, current_usage, upcoming_usage, total_estimation, usage_percent, contacts, broadcasts FROM metrics LIMIT 1"
	err := db.QueryRow(query).Scan(&m.Budget, &m.CurrentUsage, &m.UpcomingUsage, &m.TotalEstimation, &m.UsagePercent, &m.Contacts, &m.Broadcasts)
	if err != nil {
		http.Error(w, `{"error":"failed to fetch metrics"}`, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(m)
}

func main() {
	initDB()
	http.HandleFunc("/api/dashboard", getDashboard)
	log.Println("Go Backend server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
