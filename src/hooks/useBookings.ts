import { useQuery, useMutation, UseQueryResult } from '@tanstack/react-query';
import { getBookingByEmail, createBooking, modifyBooking } from '../api/bookings';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomNumber: string;
  status: string;
  createdAt?: string; 
  updatedAt?: string; 
}

export const useGetBooking = (email: string): UseQueryResult<Booking[], Error> => {
  return useQuery({
    queryKey: ['booking', email],
    queryFn: () => getBookingByEmail(email),
    enabled: !!email,
  });
};


export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (data: any) => createBooking(data),
  });
};

export const useModifyBooking = () => {
  return useMutation({
    mutationFn: (data: any) => modifyBooking(data),
  });
};