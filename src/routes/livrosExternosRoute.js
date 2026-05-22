import express from 'express';
import { listarLivrosExternos, buscarLivroExternoPorId, listarLivrosRana, criarLivroExterno } from '../controllers/livrosExternosController.js';

const router = express.Router();

router.get('/', listarLivrosExternos);
router.get('/:id', buscarLivroExternoPorId);
router.post('/', criarLivroExterno);
router.get('/rana/livros', listarLivrosRana);

export default router;
