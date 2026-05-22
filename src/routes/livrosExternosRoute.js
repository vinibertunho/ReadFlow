import express from 'express';
import { listarLivrosExternos, buscarLivroExternoPorId, listarLivrosRana, criarLivroExterno, importarLivroClubyx, listarClubyx, listarClubyxRaw, listarClubyxFull, listarTodasIntegracoes } from '../controllers/livrosExternosController.js';

const router = express.Router();

router.get('/', listarLivrosExternos);
router.get('/rana/livros', listarLivrosRana);
router.post('/clubyx/importar', importarLivroClubyx);
router.get('/clubyx', listarClubyx);
router.get('/clubyx/raw', listarClubyxRaw);
router.get('/clubyx/full', listarClubyxFull);
router.get('/todos', listarTodasIntegracoes);
router.post('/', criarLivroExterno);
router.get('/:id', buscarLivroExternoPorId);

export default router;
