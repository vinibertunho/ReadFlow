import { buscarLivrosExternos } from '../lib/services/livrosService.js';

export const listarLivrosExternos = async (req, res) => {
    try {
        const dados = await buscarLivrosExternos();

        return res.status(200).json({
            data: dados,
        });
    } catch (error) {
        console.error('Erro ao buscar livros externos:', error);

        const payload = {
            error: 'Não foi possível carregar os livros externos no momento.',
            data: [],
        };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }

        return res.status(200).json(payload);
    }
};
