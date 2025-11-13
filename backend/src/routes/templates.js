import express from 'express';
import { getTemplates, createTemplate, deleteTemplate } from '../controllers/templateController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getTemplates);
router.post('/', authenticate, createTemplate);
router.delete('/:id', authenticate, deleteTemplate);

export default router;