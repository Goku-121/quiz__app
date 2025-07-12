import express from 'express';
import {
  saveResult,
  getResults,
  deleteAllResults,
  deleteResultById,
} from '../controllers/routerController.js';

const router = express.Router();

router.post('/', saveResult);
router.get('/', getResults);
router.delete('/', deleteAllResults);
router.delete('/:id', deleteResultById);

export default router;
