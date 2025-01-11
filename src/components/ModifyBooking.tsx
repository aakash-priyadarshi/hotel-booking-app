// src/components/ModyfyBooking.tsx
import { useState } from 'react';
import { useModifyBooking } from '../hooks/useBookings';

interface ModifyBookingProps {
  booking: {
    id: string;
    email: string;
    checkIn: string;
    checkOut: string;
  };
  onClose: () => void;
}

const ModifyBooking: React.FC<ModifyBookingProps> = ({ booking, onClose }) => {
  const [formData, setFormData] = useState({
    email: booking.email,
    bookingId: booking.id,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
  });

  const modifyMutation = useModifyBooking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modifyMutation.mutate(formData, {
      onSuccess: () => {
        alert('Booking modified successfully!');
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Modify Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Booking ID</label>
            <input
              type="text"
              value={formData.bookingId}
              onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Check-in Date</label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Check-out Date</label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={modifyMutation.isPending}
          >
            {modifyMutation.isPending ? 'Updating...' : 'Update Booking'}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModifyBooking;