import express from 'express';
import { getUsers, deleteUser, getAnalytics } from '../controllers/adminController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';

const router = express.Router();

router.get('/users', authenticate, authorize('admin'), getUsers);
router.delete('/users/:id', authenticate, authorize('admin'), deleteUser);
router.get('/analytics', authenticate, authorize('admin'), getAnalytics);

export default router;