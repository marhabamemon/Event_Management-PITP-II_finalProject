import Review from '../models/Review.js';
import Booking from '../models/Booking.js';

export const getEventReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;

    // Check if user has booked and attended the event
    const booking = await Booking.findOne({ event: eventId, user: req.user.id });
    if (!booking || !booking.attended) {
      return res.status(403).json({ message: 'You must book and attend the event to leave a review' });
    }

    const review = new Review({
      event: eventId,
      user: req.user.id,
      rating,
      comment
    });

    await review.save();
    await review.populate('user', 'name');
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('event', 'title')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await Review.countDocuments();
    res.json({ reviews, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};