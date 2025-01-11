import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createBooking = async (data: any) => {
  const response = await axios.post(`${API_URL}/bookings`, data);
  return response.data;
};

export const getBookingByEmail = async (email: string) => {
  const response = await axios.get(`${API_URL}/bookings/${email}`);
  return response.data;
};

export const getAllGuests = async () => {
  const response = await axios.get(`${API_URL}/guests`);
  return response.data;
};

export const modifyBooking = async (data: any) => {
  const response = await axios.put(`${API_URL}/bookings`, data);
  return response.data;
};