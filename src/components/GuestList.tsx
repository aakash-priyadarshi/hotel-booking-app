// src/components/GuestList.tsx
import { useQuery } from '@tanstack/react-query';
import { getAllGuests } from '../api/bookings';

interface Guest {
  _id: string;
  email: string;
  name: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

const GuestList = () => {
  const { data: guests, isLoading, error } = useQuery({
    queryKey: ['guests'],
    queryFn: async () => {
      const response = await getAllGuests();
      return response.data;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading guests</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Current Hotel Guests
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {guests?.map((guest: Guest) => (
            <li key={guest._id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{guest.name}</p>
                  <p className="text-sm text-gray-500">{guest.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Room {guest.roomNumber}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>Check-in: {new Date(guest.checkIn).toLocaleDateString()}</p>
                <p>Check-out: {new Date(guest.checkOut).toLocaleDateString()}</p>
                <p>Status: {guest.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GuestList;