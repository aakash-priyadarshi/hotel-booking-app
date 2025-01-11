// src/routes/bookings.ts
import express, { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import Booking, { IBooking, IBookingDocument } from '../models/Booking';

const router: Router = express.Router();

// Response types
interface SuccessResponse<T> {
  data: T;
}

interface ErrorResponse {
  error: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Route handler types
type RequestHandler<ReqBody = any, ResBody = any, Params = any> = (
  req: Request<Params, ResBody, ReqBody>,
  res: Response<ResBody>,
  next: express.NextFunction
) => Promise<void> | void;

interface CreateBookingRequest {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
}

interface ModifyBookingBody {
  bookingId: string;
  checkIn: string;
  checkOut: string;
}

interface BookingParams {
  id: string;
}

interface EmailParams {
  email: string;
}

// Create booking
router.post('/bookings', (async (req, res: Response<ApiResponse<IBooking>>) => {
  try {
    const bookingData: CreateBookingRequest = req.body;
    const booking: IBookingDocument = new Booking({
      ...bookingData,
      roomNumber: Math.floor(Math.random() * 100) + 100,
      status: 'checked-in',
      checkIn: new Date(bookingData.checkIn),
      checkOut: new Date(bookingData.checkOut)
    });
    const savedBooking = await booking.save();
    res.status(201).json({ data: savedBooking.toObject() });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}) as RequestHandler<CreateBookingRequest, ApiResponse<IBooking>>);

// Get booking by email
router.get('/bookings/:email', (async (req, res: Response<ApiResponse<IBooking[]>>) => {
  try {
    const bookings: IBookingDocument[] = await Booking.find({ email: req.params.email });
    res.json({ data: bookings.map(booking => booking.toObject()) });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}) as RequestHandler<{}, ApiResponse<IBooking[]>, EmailParams>);

// Get all current guests
router.get('/guests', (async (_req, res: Response<ApiResponse<IBooking[]>>) => {
  try {
    const guests: IBookingDocument[] = await Booking.find({
      status: 'checked-in',
      checkOut: { $gte: new Date() }
    });
    res.json({ data: guests.map(guest => guest.toObject()) });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}) as RequestHandler<{}, ApiResponse<IBooking[]>>);

// Modify booking
router.put('/bookings', (async (req, res: Response<ApiResponse<IBooking>>) => {
  try {
    const { bookingId, checkIn, checkOut } = req.body;
    
    if (!Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }

    const booking: IBookingDocument | null = await Booking.findByIdAndUpdate(
      bookingId,
      {
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut)
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ data: booking.toObject() });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}) as RequestHandler<ModifyBookingBody, ApiResponse<IBooking>>);

// Cancel booking
router.delete('/bookings/:id', (async (req, res: Response<ApiResponse<IBooking>>) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }

    const booking: IBookingDocument | null = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ data: booking.toObject() });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}) as RequestHandler<{}, ApiResponse<IBooking>, BookingParams>);

export default router;