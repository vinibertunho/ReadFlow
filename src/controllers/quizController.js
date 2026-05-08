import QuizModel from '../models/QuizModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { livroId, titulo, descricao, idioma, tempoLimiteMin,  } = req.body;

        if (!livroId) {
            return res.status(400).json({ error: 'O campo "livroId" é obrigatório!' });
        }

        if (!titulo) {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }

        const quiz = new QuizModel({ livroId: parseInt(livroId), nome, descricao });
        const data = await quiz.criar();

        return res.status(201).json({ message: 'Personagem criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o personagem.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const quiz = await QuizModel.buscarTodos(req.query);

        if (!quiz || quiz.length === 0) {
            return res.status(400).json({ message: 'Nenhum personagem encontrado.' });
        }

        return res.status(200).json(quiz);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar personagens.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz não encontrado.' });
        }

        return res.status(200).json({ data: quiz });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar personagem.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res
                .status(400)
                .json({ error: 'Corpo da requisição vazio. Envie os dados do personagem!' });
        }

        const quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            quiz.nome = req.body.nome;
        }
        if (req.body.livroId !== undefined) {
            quiz.livroId = req.body.livroId;
        }
        if (req.body.descricao !== undefined) {
            quiz.descricao = req.body.descricao;
        }

        const data = await quiz.atualizar();

        return res
            .status(200)
            .json({ message: 'O quiz "${data.nome}" foi atualizado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar quiz.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz não encontrado para deletar.' });
        }

        await quiz.deletar();

        return res
            .status(200)
            .json({
                message: 'O quiz "${quiz.nome}" foi deletado com sucesso!',
                deletado: quiz,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar quiz.' });
    }
};
