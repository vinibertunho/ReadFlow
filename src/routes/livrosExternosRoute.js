import { Router } from 'express';
import { 
    obterBibliotecaCompleta, 
    listarIntegracao, 
    importarTodosOsLivros,
    obterLivroPorIdOuTitulo,
    obterGuarani,
    obterQuartosDespejo,
    obterMemoriasCubas,
    obterBookverse,
    obterVidasSecas
} from '../controllers/integracaoController.js';

const router = Router();

router.get('/', obterBibliotecaCompleta);

// Retorna uma lista unificada de todos os livros juntos e sem duplicatas
router.get('/integracao', listarIntegracao);

// Salva em lote todos os livros encontrados no seu banco de dados via Prisma
router.post('/importar', importarTodosOsLivros);

// Busca um livro específico da integração por ID ou título
router.get('/livro/:id', obterLivroPorIdOuTitulo);

// Rotas específicas para cada livro
router.get('/guarani', obterGuarani);
router.get('/quartos-despejo', obterQuartosDespejo);
router.get('/memorias-cubas', obterMemoriasCubas);
router.get('/bookverse', obterBookverse);
router.get('/vidas-secas', obterVidasSecas);

export default router;