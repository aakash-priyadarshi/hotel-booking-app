// tests/main.go
package tests

import (
	"fmt"
	"log"
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	// Setup before tests
	fmt.Println("Setting up test environment...")

	// Run tests
	code := m.Run()

	// Cleanup after tests
	fmt.Println("Cleaning up test environment...")

	// Exit with the test status code
	os.Exit(code)
}

// Initialize test logger
func init() {
	log.SetPrefix("TEST: ")
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
}
