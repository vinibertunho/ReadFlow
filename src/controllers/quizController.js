import QuizModel from '../models/QuizModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const {
            livroId,
            titulo,
            descricao,
            idioma,
            tempoLimiteMin,
            ativo
        } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: 'O campo "titulo" é obrigatório!'
            });
        }

        const quiz = new QuizModel({
            livroId: livroId ? parseInt(livroId) : null,
            titulo,
            descricao: descricao ?? null,
            idioma: idioma ?? 'PT_BR',
            tempoLimiteMin: tempoLimiteMin
                ? parseInt(tempoLimiteMin)
                : null,
            ativo: ativo ?? true,
        });

        const data = await quiz.criar();

        return res.status(201).json({
            message: 'Quiz criado com sucesso!',
            data
        });

    } catch (error) {
        console.error('Erro ao criar:', error);

        return res.status(500).json({
            error: 'Erro interno ao salvar o quiz.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const quiz = await QuizModel.buscarTodos(req.query);

        if (!quiz || quiz.length === 0) {
            return res.status(404).json({
                message: 'Nenhum quiz encontrado.'
            });
        }

        return res.status(200).json(quiz);

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar quizzes.'
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'O ID enviado não é um número válido.'
            });
        }

        const quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!quiz) {
            return res.status(404).json({
                error: 'Quiz não encontrado.'
            });
        }

        return res.status(200).json({
            data: quiz
        });

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar quiz.'
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido.'
            });
        }

        const quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!quiz) {
            return res.status(404).json({
                error: 'Quiz não encontrado para atualizar.'
            });
        }

        if (req.body.livroId !== undefined) {
            quiz.livroId = parseInt(req.body.livroId);
        }

        if (req.body.titulo !== undefined) {
            quiz.titulo = req.body.titulo;
        }

        if (req.body.descricao !== undefined) {
            quiz.descricao = req.body.descricao;
        }

        if (req.body.idioma !== undefined) {
            quiz.idioma = req.body.idioma;
        }

        if (req.body.tempoLimiteMin !== undefined) {
            quiz.tempoLimiteMin = parseInt(req.body.tempoLimiteMin);
        }

        if (req.body.ativo !== undefined) {
            quiz.ativo = req.body.ativo;
        }

        const data = await quiz.atualizar();

        return res.status(200).json({
            message: `O quiz "${data.titulo}" foi atualizado com sucesso!`,
            data
        });

    } catch (error) {
        console.error('Erro ao atualizar:', error);

        return res.status(500).json({
            error: 'Erro ao atualizar quiz.'
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido.'
            });
        }

        const quiz = await QuizModel.buscarPorId(parseInt(id));

        if (!quiz) {
            return res.status(404).json({
                error: 'Quiz não encontrado para deletar.'
            });
        }

        await quiz.deletar();

        return res.status(200).json({
            message: `O quiz "${quiz.titulo}" foi deletado com sucesso!`,
            deletado: quiz
        });

    } catch (error) {
        console.error('Erro ao deletar:', error);

        return res.status(500).json({
            error: 'Erro ao deletar quiz.'
        });
    }
};