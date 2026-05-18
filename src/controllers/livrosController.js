import { buscarLivrosExternos } from '../lib/services/livrosService.js';

export const listarLivrosExternos = async (req, res) => {
    try {
        const dados = await buscarLivrosExternos();

        return res.status(200).json({
            data: dados,
        });
    } catch (error) {
        console.error('Erro ao buscar livros externos:', error);

        return res.status(500).json({
            error: 'Erro ao buscar os livros na API externa.',
        });
    }
};
