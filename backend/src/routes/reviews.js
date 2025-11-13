import express from 'express';
import { getEventReviews, createReview, getAllReviews } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';

const router = express.Router();

router.get('/event/:eventId', getEventReviews);
router.post('/', authenticate, createReview);

// Admin route
router.get('/admin/all', authenticate, authorize('admin'), getAllReviews);

export default router;