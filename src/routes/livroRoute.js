import express from 'express';
import * as controller from '../controllers/livroController.js';
import { apiKey } from '../lib/middlewares/apiKey.js';

const router = express.Router();

router.use(apiKey);

router.post('/', controller.criar);
router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);
// Rota simples para importar livro do Clubyx (mais fácil de chamar)
// NOTE: rotas de integração (Clubyx/Rana) agora estão sob `/livros/integracao`.

export default router;