import { useState } from 'react';
import { useModifyBooking } from '../hooks/useBookings';

interface ModifyBookingData {
  email: string;
  bookingId: string;
  checkIn: string;
  checkOut: string;
}

const ModifyBooking = () => {
  const [formData, setFormData] = useState<ModifyBookingData>({
    email: '',
    bookingId: '',
    checkIn: '',
    checkOut: '',
  });

  const modifyMutation = useModifyBooking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modifyMutation.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Modify Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Booking ID</label>
          <input
            type="text"
            value={formData.bookingId}
            onChange={(e) =>
              setFormData({ ...formData, bookingId: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Check-in Date</label>
          <input
            type="date"
            value={formData.checkIn}
            onChange={(e) =>
              setFormData({ ...formData, checkIn: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Check-out Date</label>
          <input
            type="date"
            value={formData.checkOut}
            onChange={(e) =>
              setFormData({ ...formData, checkOut: e.target.value })
            }
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
    </div>
  );
};

export default ModifyBooking;