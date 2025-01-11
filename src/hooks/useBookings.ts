// src/hooks/useBookings.ts
import { useQuery, useMutation, UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { getBookingByEmail, createBooking, modifyBooking, cancelBooking, getAllGuests } from '../api/bookings';

interface Booking {
  _id: string;  // Changed from id to _id to match MongoDB
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

interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const useGetBooking = (email: string): UseQueryResult<Booking[], Error> => {
  return useQuery({
    queryKey: ['booking', email],
    queryFn: async () => {
      const response = await getBookingByEmail(email);
      return response.data;  // Extract data from response
    },
    enabled: !!email,
  });
};

export const useGetGuests = () => {
  return useQuery({
    queryKey: ['guests'],
    queryFn: async () => {
      const response = await getAllGuests();
      return response.data;  // Extract data from response
    },
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await createBooking(data);
      return response.data;
    },
  });
};

export const useModifyBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await modifyBooking(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking', variables.email] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await cancelBooking(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking'] });
    },
  });
};