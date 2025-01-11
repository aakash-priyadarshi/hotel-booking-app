import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  roomNumber: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled', 'checked-in', 'checked-out'],
    default: 'confirmed'
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);