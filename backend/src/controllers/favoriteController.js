import Favorite from '../models/Favorite.js';

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('event');
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { eventId } = req.body;
    const existingFavorite = await Favorite.findOne({ user: req.user.id, event: eventId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Event already in favorites' });
    }
    const favorite = new Favorite({ user: req.user.id, event: eventId });
    await favorite.save();
    await favorite.populate('event');
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({ user: req.user.id, event: req.params.eventId });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};