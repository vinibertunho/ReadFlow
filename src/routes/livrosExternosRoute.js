import { Router } from 'express';
import { 
    obterBibliotecaCompleta, 
    listarIntegracao, 
    importarTodosOsLivros 
} from '../controllers/integracaoController.js';

const router = Router();

// Retorna o status e os livros de cada uma das 4 APIs individualmente
router.get('/', obterBibliotecaCompleta);

// Retorna uma lista unificada de todos os livros juntos e sem duplicatas
router.get('/integracao', listarIntegracao);

// Salva em lote todos os livros encontrados no seu banco de dados via Prisma
router.post('/importar', importarTodosOsLivros);

export default router;