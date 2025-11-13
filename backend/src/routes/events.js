import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent, getAllEvents, approveEvent, rejectEvent, getMyEvents, getAttendees } from '../controllers/eventController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authenticate, authorize('organizer', 'admin'), upload.array('images', 5), createEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, deleteEvent);
router.get('/my-events', authenticate, authorize('organizer'), getMyEvents);
router.get('/:id/attendees', authenticate, getAttendees);

// Admin routes
router.get('/admin/all', authenticate, authorize('admin'), getAllEvents);
router.put('/:id/approve', authenticate, authorize('admin'), approveEvent);
router.put('/:id/reject', authenticate, authorize('admin'), rejectEvent);

export default router;