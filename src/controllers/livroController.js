import LivroModel from '../models/LivroModel.js';

const converterCamposNumericos = (dados) => {
    const formatado = { ...dados };
    if (dados.anoPublicacao !== undefined) formatado.anoPublicacao = dados.anoPublicacao ? parseInt(dados.anoPublicacao) : null;
    if (dados.usuarioId !== undefined) formatado.usuarioId = dados.usuarioId ? parseInt(dados.usuarioId) : null;
    return formatado;
};

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const camposObrigatorios = ['titulo', 'autor', 'genero_pt', 'genero_en'];
        for (const campo of camposObrigatorios) {
            if (!req.body[campo]) {
                return res.status(400).json({ error: `O campo "${campo}" é obrigatório!` });
            }
        }

        const dadosLivro = converterCamposNumericos(req.body);
        const livro = new LivroModel(dadosLivro);
        const data = await livro.criar();

        return res.status(201).json({
            message: 'Livro criado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o livro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await LivroModel.buscarTodos(req.query);
        return res.status(200).json(registros || []);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const livro = await LivroModel.buscarPorId(id);

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        return res.json({ data: livro });
    } catch (error) {
        console.error('Erro ao buscar livro:', error);
        return res.status(500).json({ error: 'Erro ao buscar livro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const livro = await LivroModel.buscarPorId(id);

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado para atualizar.' });
        }

        const dadosAtualizados = converterCamposNumericos(req.body);
        Object.assign(livro, dadosAtualizados);

        const data = await livro.atualizar();

        return res.json({ 
            message: `O livro "${data.titulo}" foi atualizado com sucesso!`, 
            data 
        });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        return res.status(500).json({ error: 'Erro ao atualizar livro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(id);

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado para deletar.' });
        }

        await livro.deletar();

        return res.json({
            message: `O livro "${livro.titulo}" foi deletado com sucesso!`,
            deletado: livro,
        });
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        return res.status(500).json({ error: 'Erro ao deletar livro.' });
    }
};