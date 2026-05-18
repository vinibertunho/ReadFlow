import express from 'express';
import { listarLivrosExternos } from '../controllers/livrosController.js';
import { apiKey } from '../lib/middlewares/apiKey.js';

const router = express.Router();

router.get('/', apiKey, listarLivrosExternos);

export default router;
