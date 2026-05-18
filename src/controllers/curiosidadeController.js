import CuriosidadeModel from '../models/CuriosidadeModel.js';


export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { titulo, texto, livroId, autorUsuarioId, publicado } = req.body;
        if (!titulo) return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        if (!texto) return res.status(400).json({ error: 'O campo "texto" é obrigatório!' });
        if (!livroId) return res.status(400).json({ error: 'O campo "livroId" é obrigatório!' });
        if (!autorUsuarioId)
            return res.status(400).json({ error: 'O campo "autorUsuarioId" é obrigatório!' });

        const curiosidade = new CuriosidadeModel({
            titulo,
            texto,
            livroId,
            autorUsuarioId,
            publicado: publicado ?? false,
        });

        const data = await curiosidade.criar();

        return res.status(201).json({ message: 'Curiosidade criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar curiosidade:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await CuriosidadeModel.buscarTodos(req.query);

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

        const curiosidade = await CuriosidadeModel.buscarPorId(parseInt(id));

        if (!curiosidade) {
            return res.status(404).json({ error: 'Curiosidade não encontrada.' });
        }

        return res.status(200).json({ data: curiosidade });
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

        const curiosidade = await CuriosidadeModel.buscarPorId(parseInt(id));

        if (!curiosidade) {
            return res.status(404).json({
                error: 'Registro não encontrado para atualizar.',
            });
        }

        curiosidade.titulo =
            req.body.titulo ?? curiosidade.titulo;

        curiosidade.texto =
            req.body.texto ?? curiosidade.texto;

        curiosidade.livroId =
            req.body.livroId ?? curiosidade.livroId;

        curiosidade.autorUsuarioId =
            req.body.autorUsuarioId ?? curiosidade.autorUsuarioId;

        curiosidade.publicado =
            req.body.publicado ?? curiosidade.publicado;

        const data = await curiosidade.atualizar();

        return res.status(200).json({
            message: `A curiosidade "${data.titulo}" foi atualizada!`,
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

        const curiosidade = await CuriosidadeModel.buscarPorId(parseInt(id));

        if (!curiosidade) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await curiosidade.deletar();

        return res.status(200).json({
            message: `A curiosidade "${curiosidade.titulo}" foi deletada com sucesso!`,
            deletado: curiosidade,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
