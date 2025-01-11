// src/components/BookingForm.tsx
import { createBooking } from '../api/bookings';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      alert('Booking successful!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Book a Room</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 font-medium text-lg transition-colors mt-6"
            disabled={bookingMutation.isPending}
          >
            {bookingMutation.isPending ? 'Booking...' : 'Book Room'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;