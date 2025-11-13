import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const existingBooking = await Booking.findOne({ user: req.user.id, event: eventId, status: 'confirmed' });
    if (existingBooking) return res.status(400).json({ message: 'Already booked' });
    const bookingCount = await Booking.countDocuments({ event: eventId, status: 'confirmed' });
    if (bookingCount >= event.capacity) return res.status(400).json({ message: 'Event full' });
    const booking = new Booking({ user: req.user.id, event: eventId, amountPaid: event.price });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAttended = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.attended = true;
    await booking.save();
    res.json({ message: 'Marked as attended', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};