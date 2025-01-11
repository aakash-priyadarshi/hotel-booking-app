import { useState } from 'react';
import { useGetBooking } from '../hooks/useBookings';

const BookingDetails = () => {
  const [email, setEmail] = useState('');
  const { data: booking, isLoading, error } = useGetBooking(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Query will automatically run when email changes
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

      {isLoading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error finding booking</p>}
      {booking && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Booking Information</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(booking, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;