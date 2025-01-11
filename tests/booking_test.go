// tests/booking_test.go
package tests

import (
	"fmt"
	"testing"
	"time"
)

type Booking struct {
	ID       string
	Name     string
	Email    string
	CheckIn  time.Time
	CheckOut time.Time
	RoomNo   int
}

func TestBookingValidation(t *testing.T) {
	tests := []struct {
		name    string
		booking Booking
		wantErr bool
	}{
		{
			name: "valid booking",
			booking: Booking{
				Name:     "John Doe",
				Email:    "john@example.com",
				CheckIn:  time.Now(),
				CheckOut: time.Now().Add(24 * time.Hour),
			},
			wantErr: false,
		},
		{
			name: "invalid dates",
			booking: Booking{
				CheckOut: time.Now(),
				CheckIn:  time.Now().Add(24 * time.Hour),
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := validateBooking(tt.booking); (err != nil) != tt.wantErr {
				t.Errorf("validateBooking() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func validateBooking(b Booking) error {
	if b.CheckIn.After(b.CheckOut) {
		return fmt.Errorf("check-in date must be before check-out date")
	}
	return nil
}

func TestRoomAssignment(t *testing.T) {
	booking := Booking{
		Name:     "Jane Doe",
		Email:    "jane@example.com",
		CheckIn:  time.Now(),
		CheckOut: time.Now().Add(24 * time.Hour),
	}

	roomNo := assignRoom(booking)
	if roomNo < 100 || roomNo > 500 {
		t.Errorf("Room number %d not in valid range [100-500]", roomNo)
	}
}

func TestEmailValidation(t *testing.T) {
	tests := []struct {
		email   string
		isValid bool
	}{
		{"valid@email.com", true},
		{"invalid.email", false},
		{"", false},
	}

	for _, tt := range tests {
		isValid := validateEmail(tt.email)
		if isValid != tt.isValid {
			t.Errorf("validateEmail(%s) = %v; want %v", tt.email, isValid, tt.isValid)
		}
	}
}

func assignRoom(booking Booking) int {
	// Simple room assignment logic for testing
	return 100 + (len(booking.Name) % 400)
}

func validateEmail(email string) bool {
	// Basic email validation
	if len(email) == 0 {
		return false
	}
	hasAt := false
	hasDot := false
	for _, char := range email {
		if char == '@' {
			hasAt = true
		}
		if char == '.' {
			hasDot = true
		}
	}
	return hasAt && hasDot
}
