import express from 'express';
import { obterBibliotecaCompleta } from '../controllers/integracaoController.js';

const router = express.Router();

router.get('/', obterBibliotecaCompleta);

export default router;
