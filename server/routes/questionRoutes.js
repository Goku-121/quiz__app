import express from 'express';
import { getQuestions, getQuestionsByCategory } from '../controllers/routerController.js';

const router = express.Router();

router.get('/', getQuestions);
router.get('/:category', getQuestionsByCategory);

export default router;
