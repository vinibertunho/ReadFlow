import SobreProjetoModel from '../models/SobreProjetoModel.js';


export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { descricao_pt, descricao_en } = req.body;
        if (!descricao_pt)
            return res.status(400).json({ error: 'O campo "descricao_pt" é obrigatório!' });
        if (!descricao_en)
            return res.status(400).json({ error: 'O campo "descricao_en" é obrigatório!' });

        const sobreProjeto = new SobreProjetoModel({ descricao_pt, descricao_en });

        const data = await sobreProjeto.criar();

        return res.status(201).json({ message: 'Sobre o projeto criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar sobre o projeto:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await SobreProjetoModel.buscarTodos();

        if (!registros || registros.length === 0) {
            return res.status(404).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
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

        const sobreProjeto = await SobreProjetoModel.buscarPorId(parseInt(id));

        if (!sobreProjeto) {
            return res.status(404).json({ error: 'Sobre o projeto não encontrado.' });
        }

        return res.status(200).json({ data: sobreProjeto });
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

        const sobreProjeto = await SobreProjetoModel.buscarPorId(parseInt(id));

        if (!sobreProjeto) {
            return res.status(404).json({
                error: 'Registro não encontrado para atualizar.',
            });
        }

        sobreProjeto.descricao_pt =
            req.body.descricao_pt ?? sobreProjeto.descricao_pt;

        sobreProjeto.descricao_en =
            req.body.descricao_en ?? sobreProjeto.descricao_en;

        const data = await sobreProjeto.atualizar();

        return res.status(200).json({
            message: 'Sobre o projeto atualizado!',
            data,
        });

    } catch (error) {
        console.error('Erro ao atualizar:', error);

        return res.status(500).json({
            error: 'Erro ao atualizar registro.',
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const sobreProjeto = await SobreProjetoModel.buscarPorId(parseInt(id));

        if (!sobreProjeto) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await sobreProjeto.deletar();

        return res.status(200).json({
            message: 'Sobre o projeto deletado com sucesso!',
            deletado: sobreProjeto,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
