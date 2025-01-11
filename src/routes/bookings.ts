import express from 'express';
import Booking from '../models/Booking';

const router = express.Router();

// Create booking
router.post('/bookings', async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      roomNumber: Math.floor(Math.random() * 100) + 100, // Simple room assignment
      status: 'checked-in'
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get booking by email
router.get('/bookings/:email', async (req, res) => {
  try {
    const booking = await Booking.find({ email: req.params.email });
    res.json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get all current guests
router.get('/guests', async (_req, res) => {
  try {
    const guests = await Booking.find({ 
      status: 'checked-in',
      checkOut: { $gte: new Date() }
    });
    res.json(guests);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Modify booking
router.put('/bookings', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.body.bookingId,
      { checkIn: req.body.checkIn, checkOut: req.body.checkOut },
      { new: true }
    );
    res.json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;