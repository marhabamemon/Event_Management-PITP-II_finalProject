import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  amountPaid: { type: Number, default: 0 },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  attended: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);