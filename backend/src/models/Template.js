import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  templateData: {
    title: String,
    description: String,
    category: String,
    location: String,
    capacity: Number,
    price: Number,
    tags: [String]
  }
}, { timestamps: true });

export default mongoose.model('Template', templateSchema);