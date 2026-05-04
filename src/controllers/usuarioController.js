import UsuarioModel from '../models/UsuarioModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, email, senhaHash, papel, idiomaPreferido, ativo } = req.body;

        if (!nome){
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }
        if (!email){
            return res.status(400).json({ error: 'O campo "email" é obrigatório!' });
        }
        if (!senhaHash){
            return res.status(400).json({ error: 'O campo "senhaHash" é obrigatório!' });
        }
        if (!papel){
            return res.status(400).json({ error: 'O campo "papel" é obrigatório!' });
        }
        if (!idiomaPreferido){
            return res.status(400).json({ error: 'O campo "idiomaPreferido" é obrigatório!' });
        }

        const usuario = new UsuarioModel({ nome, email, senhaHash, papel, idiomaPreferido, ativo});
        const data = await usuario.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await UsuarioModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
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

        const usuario = await UsuarioModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: usuario });
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

        const usuario = await UsuarioModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            usuario.nome = req.body.nome;
        }
        if (req.body.email !== undefined) {
            usuario.email = req.body.email;
        }
        if (req.body.senhaHash !== undefined) {
            usuario.senhaHash = req.body.senhaHash;
        }
        if (req.body.papel !== undefined) {
            usuario.papel = req.body.papel;
        }
        if (req.body.idiomaPreferido !== undefined) {
            usuario.idiomaPreferido = req.body.idiomaPreferido;
        }
        if (req.body.ativo !== undefined) {
            usuario.ativo = req.body.ativo;
        }

        const data = await usuario.atualizar();

        return res.status(200).json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
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

        const usuario = await UsuarioModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await usuario.deletar();

        return res.status(200).json({ message: `O registro "${usuario.nome}" foi deletado com sucesso!`, deletado: usuario });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
