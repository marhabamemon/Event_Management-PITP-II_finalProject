import express from 'express';
import { getBookings, createBooking, cancelBooking, markAttended } from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getBookings);
router.post('/', authenticate, createBooking);
router.put('/:id/attend', authenticate, markAttended);
router.delete('/:id', authenticate, cancelBooking);

export default router;