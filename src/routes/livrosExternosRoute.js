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
} from '../controllers/integracaoController.js'; // 👈 Troquei para "integracaoController.js" com "i" minúsculo

const router = Router();

router.get('/', obterBibliotecaCompleta);
router.get('/integracao', listarIntegracao);
router.post('/importar', importarTodosOsLivros);
router.get('/livro/:id', obterLivroPorIdOuTitulo);
router.get('/guarani', obterGuarani);
router.get('/quartos-despejo', obterQuartosDespejo);
router.get('/memorias-cubas', obterMemoriasCubas);
router.get('/bookverse', obterBookverse);
router.get('/vidas-secas', obterVidasSecas);

export default router;