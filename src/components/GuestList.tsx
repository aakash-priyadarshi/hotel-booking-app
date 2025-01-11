// src/components/GuestList.tsx
import { useQuery } from '@tanstack/react-query';
import { getAllGuests } from '../api/bookings';

interface Guest {
  email: string;
  name: string;
  roomNumber: string;
}

const GuestList = () => {
  const { data: guests, isLoading, error } = useQuery({
    queryKey: ['guests'],
    queryFn: getAllGuests
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
            <li key={guest.email} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{guest.name}</p>
                  <p className="text-sm text-gray-500">{guest.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Room {guest.roomNumber}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GuestList;