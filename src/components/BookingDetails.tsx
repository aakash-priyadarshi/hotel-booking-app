import { useState } from 'react';
import { useGetBooking } from '../hooks/useBookings';

const BookingDetails = () => {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { data: bookings, isLoading, error } = useGetBooking(submittedEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedEmail(email); // Trigger the query with the submitted email
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
      {bookings && bookings.length > 0 ? (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Booking Information</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Name</td>
                <td className="border border-gray-300 px-4 py-2">{bookings[0].name}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Email</td>
                <td className="border border-gray-300 px-4 py-2">{bookings[0].email}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Phone</td>
                <td className="border border-gray-300 px-4 py-2">{bookings[0].phone}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Check-in</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(bookings[0].checkIn).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Check-out</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(bookings[0].checkOut).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Room Number</td>
                <td className="border border-gray-300 px-4 py-2">{bookings[0].roomNumber}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Status</td>
                <td className="border border-gray-300 px-4 py-2">{bookings[0].status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading &&
        submittedEmail && ( // Only show this message after form submission
          <p className="mt-4 text-gray-500">No booking data found for the entered email.</p>
        )
      )}
    </div>
  );
};

export default BookingDetails;
