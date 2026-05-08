import QuestaoModel from '../models/QuestaoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { quizId, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, gabarito, dificuldade, comentarioResolucao } = req.body;

        if (quizId === undefined || quizId === null) {
            return res.status(400).json({ error: 'O campo "quizId" é obrigatório!' });
        }
        if (!enunciado) {
            return res.status(400).json({ error: 'O campo "enunciado" é obrigatório!' });
        }
        if (!alternativaA) {
            return res.status(400).json({ error: 'O campo "alternativaA" é obrigatório!' });
        }
        if (!alternativaB) {
            return res.status(400).json({ error: 'O campo "alternativaB" é obrigatório!' });
        }
        if (!alternativaC) {
            return res.status(400).json({ error: 'O campo "alternativaC" é obrigatório!' });
        }
        if (!alternativaD) {
            return res.status(400).json({ error: 'O campo "alternativaD" é obrigatório!' });
        }
        if (!gabarito) {
            return res.status(400).json({ error: 'O campo "gabarito" é obrigatório!' });
        }

        const questao = new QuestaoModel({ quizId: parseInt(quizId), enunciado, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE: alternativaE ?? null, gabarito, dificuldade: dificuldade ?? 'MEDIA', comentarioResolucao: comentarioResolucao ?? null });

        const data = await questao.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await QuestaoModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.json({ data: questao });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.quizId !== undefined) {
            questao.quizId = req.body.quizId ? parseInt(req.body.quizId) : null;
        }
        if (req.body.enunciado !== undefined) {
            questao.enunciado = req.body.enunciado;
        }
        if (req.body.alternativaA !== undefined) {
            questao.alternativaA = req.body.alternativaA;
        }
        if (req.body.alternativaB !== undefined) {
            questao.alternativaB = req.body.alternativaB;
        }
        if (req.body.alternativaC !== undefined) {
            questao.alternativaC = req.body.alternativaC;
        }
        if (req.body.alternativaD !== undefined) {
            questao.alternativaD = req.body.alternativaD;
        }
        if (req.body.alternativaE !== undefined) {
            questao.alternativaE = req.body.alternativaE;
        }
        if (req.body.gabarito !== undefined) {
            questao.gabarito = req.body.gabarito;
        }
        if (req.body.dificuldade !== undefined) {
            questao.dificuldade = req.body.dificuldade;
        }
        if (req.body.comentarioResolucao !== undefined) {
            questao.comentarioResolucao = req.body.comentarioResolucao;
        }

        const data = await questao.atualizar();

        return res.json({ message: `O registro "${data.enunciado}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const questao = await QuestaoModel.buscarPorId(parseInt(id));

        if (!questao) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await questao.deletar();

        return res.json({ message: `O registro "${questao.enunciado}" foi deletado com sucesso!`, deletado: questao });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
