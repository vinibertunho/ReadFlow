import PersonagemModel from '../models/PersonagemModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { livroId, nome, descricao} = req.body;

        if (!livroId) {
            return res.status(400).json({ error: 'O campo "livroId" é obrigatório!' });
        }

        if (!nome){
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }

        const personagem = new PersonagemModel({ livroId: parseInt(livroId), nome, descricao});
        const data = await personagem.criar();

        return res.status(201).json({ message: 'Personagem criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o personagem.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const personagens = await PersonagemModel.buscarTodos(req.query);

        if (!personagens || personagens.length === 0) {
            return res.status(400).json({ message: 'Nenhum personagem encontrado.' });
        }

        return res.status(200).json(personagens);
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

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado.' });
        }

        return res.status(200).json({ data: personagem });
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
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados do personagem!' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            personagem.nome = req.body.nome;
        }
        if (req.body.livroId !== undefined) {
            personagem.livroId = req.body.livroId;
        }
        if (req.body.descricao !== undefined) {
            personagem.descricao = req.body.descricao;
        }


        const data = await personagem.atualizar();

        return res.status(200).json({ message: `O personagem "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar personagem.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const personagem = await PersonagemModel.buscarPorId(parseInt(id));

        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado para deletar.' });
        }

        await personagem.deletar();

        return res.status(200).json({ message: `O personagem "${personagem.nome}" foi deletado com sucesso!`, deletado: personagem });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar personagem.' });
    }
};
