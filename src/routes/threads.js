import express from 'express';
import * as threadController from '../controllers/threadController.js';

const router = express.Router();

router.get('/', threadController.getAllThreads);
router.get('/:id', threadController.getThreadById);
router.post('/', threadController.createThread);
router.put('/:id', threadController.updateThread);
router.delete('/:id', threadController.deleteThread);

export default router;
