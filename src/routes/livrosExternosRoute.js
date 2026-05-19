import express from 'express';
import { listarLivrosExternos } from '../controllers/livrosController.js';

const router = express.Router();

router.get('/', listarLivrosExternos);

export default router;
