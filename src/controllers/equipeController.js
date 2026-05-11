import EquipeModel from '../models/EquipeModel.js';

function extrairDadosEquipe(body) {
    const { nome, descricao, integrantes, usuariosIds } = body;
    return { nome, descricao, integrantes, usuariosIds };
}

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, descricao, integrantes, usuariosIds } = extrairDadosEquipe(req.body);

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }

        const equipe = new EquipeModel({ nome, descricao, integrantes, usuariosIds });
        const data = await equipe.criar();

        return res.status(201).json({ message: 'Equipe criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar equipe:', error);
        return res.status(500).json({ error: error.message || 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await EquipeModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar equipes:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const equipe = await EquipeModel.buscarPorId(parseInt(id, 10));

        if (!equipe) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.json({ data: equipe });
    } catch (error) {
        console.error('Erro ao buscar equipe:', error);
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

        const equipe = await EquipeModel.buscarPorId(parseInt(id, 10));

        if (!equipe) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        const { nome, descricao, integrantes, usuariosIds } = extrairDadosEquipe(req.body);

        if (nome !== undefined) equipe.nome = nome;
        if (descricao !== undefined) equipe.descricao = descricao;
        if (integrantes !== undefined) equipe.integrantes = integrantes;
        if (usuariosIds !== undefined) equipe.usuariosIds = usuariosIds;

        const data = await equipe.atualizar();

        return res.json({ message: `A equipe "${data.nome}" foi atualizada com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar equipe:', error);
        return res.status(500).json({ error: error.message || 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const equipe = await EquipeModel.buscarPorId(parseInt(id, 10));

        if (!equipe) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await equipe.deletar();

        return res.json({ message: `A equipe "${equipe.nome}" foi deletada com sucesso!`, deletado: equipe });
    } catch (error) {
        console.error('Erro ao deletar equipe:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};