// src/components/BookingDetails.tsx
import { useState } from 'react';
import { useGetBooking, useCancelBooking } from '../hooks/useBookings';
import ModifyBooking from './ModifyBooking';

const BookingDetails = () => {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { data: bookings, isLoading, error } = useGetBooking(submittedEmail);
  const cancelBookingMutation = useCancelBooking();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedEmail(email);
  };

  const handleCancel = (id: string) => {
    cancelBookingMutation.mutate(id);
  };

  const handleModify = (booking: any) => {
    setSelectedBooking(booking);
  };

  const handleCloseModify = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Find Booking
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {bookings && bookings.length > 0 && (
        <div className="mt-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded mb-4">
              <p><strong>Booking ID:</strong> {booking._id}</p>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
              <p><strong>Room Number:</strong> {booking.roomNumber}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleModify(booking)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  Modify
                </button>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <ModifyBooking booking={selectedBooking} onClose={handleCloseModify} />
      )}
    </div>
  );
};