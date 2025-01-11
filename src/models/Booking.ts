// src/models/Booking.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  roomNumber: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IBookingDocument extends Document, Omit<IBooking, '_id'> {
  _id: Types.ObjectId;
}

const bookingSchema = new Schema<IBookingDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    roomNumber: { type: String, required: true },
    status: { type: String, required: true, default: 'checked-in' }
  },
  { timestamps: true }
);

export default model<IBookingDocument>('Booking', bookingSchema);