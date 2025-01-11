// tests/booking_test.go
package tests

import (
	"fmt"
	"regexp"
	"testing"
	"time"
)

type Booking struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	CheckIn   time.Time `json:"checkIn"`
	CheckOut  time.Time `json:"checkOut"`
	RoomNo    int       `json:"roomNo"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func TestBookingValidation(t *testing.T) {
	now := time.Now()
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
				Phone:    "1234567890",
				CheckIn:  now,
				CheckOut: now.Add(24 * time.Hour),
				Status:   "checked-in",
			},
			wantErr: false,
		},
		{
			name: "invalid dates - checkout before checkin",
			booking: Booking{
				Name:     "Jane Doe",
				Email:    "jane@example.com",
				Phone:    "1234567890",
				CheckOut: now,
				CheckIn:  now.Add(24 * time.Hour),
				Status:   "checked-in",
			},
			wantErr: true,
		},
		{
			name: "invalid email",
			booking: Booking{
				Name:     "Invalid User",
				Email:    "invalid.email",
				Phone:    "1234567890",
				CheckIn:  now,
				CheckOut: now.Add(24 * time.Hour),
				Status:   "checked-in",
			},
			wantErr: true,
		},
		{
			name: "empty name",
			booking: Booking{
				Name:     "",
				Email:    "valid@email.com",
				Phone:    "1234567890",
				CheckIn:  now,
				CheckOut: now.Add(24 * time.Hour),
				Status:   "checked-in",
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
	if b.Name == "" {
		return fmt.Errorf("name is required")
	}

	if !validateEmail(b.Email) {
		return fmt.Errorf("invalid email format")
	}

	if b.CheckIn.After(b.CheckOut) {
		return fmt.Errorf("check-in date must be before check-out date")
	}

	if b.CheckIn.Before(time.Now().Add(-24 * time.Hour)) {
		return fmt.Errorf("cannot book for past dates")
	}

	return nil
}

func TestRoomAssignment(t *testing.T) {
	tests := []struct {
		name    string
		booking Booking
		wantMin int
		wantMax int
		wantErr bool
	}{
		{
			name: "valid room assignment",
			booking: Booking{
				Name:     "Jane Doe",
				Email:    "jane@example.com",
				CheckIn:  time.Now(),
				CheckOut: time.Now().Add(24 * time.Hour),
			},
			wantMin: 100,
			wantMax: 500,
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			roomNo, err := assignRoom(tt.booking)
			if (err != nil) != tt.wantErr {
				t.Errorf("assignRoom() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if roomNo < tt.wantMin || roomNo > tt.wantMax {
				t.Errorf("Room number %d not in valid range [%d-%d]", roomNo, tt.wantMin, tt.wantMax)
			}
		})
	}
}

func TestEmailValidation(t *testing.T) {
	tests := []struct {
		name    string
		email   string
		isValid bool
	}{
		{
			name:    "valid email",
			email:   "valid@email.com",
			isValid: true,
		},
		{
			name:    "invalid email - no @",
			email:   "invalid.email",
			isValid: false,
		},
		{
			name:    "invalid email - empty",
			email:   "",
			isValid: false,
		},
		{
			name:    "valid email with subdomain",
			email:   "user@sub.domain.com",
			isValid: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			isValid := validateEmail(tt.email)
			if isValid != tt.isValid {
				t.Errorf("validateEmail(%s) = %v; want %v", tt.email, isValid, tt.isValid)
			}
		})
	}
}

func assignRoom(booking Booking) (int, error) {
	if booking.Name == "" {
		return 0, fmt.Errorf("booking name is required for room assignment")
	}
	// More sophisticated room assignment logic
	roomBase := 100
	roomOffset := (len(booking.Name) * len(booking.Email)) % 400
	return roomBase + roomOffset, nil
}

func validateEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}
