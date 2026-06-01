import LivroModel from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!',
            });
        }

        const {
            titulo,
            autor,
            anoPublicacao,
            sinopse,

            genero_pt,
            genero_en,

            contexto_pt,
            contexto_en,

            descricao_pt,
            descricao_en,

            detalhes_autor_pt,
            detalhes_autor_en,

            estilo_escrita_pt,
            estilo_escrita_en,

            verossimilhanca_pt,
            verossimilhanca_en,

            caracteristicas_literarias_pt,
            caracteristicas_literarias_en,

            conclusao_pt,
            conclusao_en,

            contexto_historico_pt,
            contexto_historico_en,
            simbolismo_pt,
            simbolismo_en,
            engajamento_pt,
            engajamento_en,
            temas_chave_pt,
            temas_chave_en,

            video_url,
            capa_url,
            usuarioId,
        } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: 'O campo "titulo" é obrigatório!',
            });
        }

        if (!autor) {
            return res.status(400).json({
                error: 'O campo "autor" é obrigatório!',
            });
        }

        if (!genero_pt) {
            return res.status(400).json({
                error: 'O campo "genero_pt" é obrigatório!',
            });
        }

        if (!genero_en) {
            return res.status(400).json({
                error: 'O campo "genero_en" é obrigatório!',
            });
        }

        const livro = new LivroModel({
            titulo,
            autor,

            anoPublicacao: anoPublicacao ? parseInt(anoPublicacao) : null,

            sinopse: sinopse ?? null,

            genero_pt,
            genero_en,

            contexto_pt: contexto_pt ?? null,
            contexto_en: contexto_en ?? null,

            descricao_pt: descricao_pt ?? null,
            descricao_en: descricao_en ?? null,

            detalhes_autor_pt: detalhes_autor_pt ?? null,
            detalhes_autor_en: detalhes_autor_en ?? null,

            estilo_escrita_pt: estilo_escrita_pt ?? null,
            estilo_escrita_en: estilo_escrita_en ?? null,

            verossimilhanca_pt: verossimilhanca_pt ?? null,
            verossimilhanca_en: verossimilhanca_en ?? null,

            caracteristicas_literarias_pt: caracteristicas_literarias_pt ?? null,

            caracteristicas_literarias_en: caracteristicas_literarias_en ?? null,

            conclusao_pt: conclusao_pt ?? null,
            conclusao_en: conclusao_en ?? null,

            contexto_historico_pt: contexto_historico_pt ?? null,
            contexto_historico_en: contexto_historico_en ?? null,
            simbolismo_pt: simbolismo_pt ?? null,
            simbolismo_en: simbolismo_en ?? null,
            engajamento_pt: engajamento_pt ?? null,
            engajamento_en: engajamento_en ?? null,
            temas_chave_pt: temas_chave_pt ?? null,
            temas_chave_en: temas_chave_en ?? null,

            video_url: video_url ?? null,
            capa_url: capa_url ?? null,

            usuarioId: usuarioId ? parseInt(usuarioId) : null,
        });

        const data = await livro.criar();

        return res.status(201).json({
            message: 'Livro criado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar livro:', error);

        return res.status(500).json({
            error: 'Erro interno ao salvar o livro.',
        });
    }
};
export const buscarTodos = async (req, res) => {
    try {
        const registros = await LivroModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(200).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

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
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) {
            livro.titulo = req.body.titulo;
        }
        if (req.body.autor !== undefined) {
            livro.autor = req.body.autor;
        }
        if (req.body.anoPublicacao !== undefined) {
            livro.anoPublicacao = req.body.anoPublicacao ? parseInt(req.body.anoPublicacao) : null;
        }
        if (req.body.sinopse !== undefined) {
            livro.sinopse = req.body.sinopse;
        }
        if (req.body.detalhes_autor_pt !== undefined) {
            livro.detalhes_autor_pt = req.body.detalhes_autor_pt;
        }
        if (req.body.detalhes_autor_en !== undefined) {
            livro.detalhes_autor_en = req.body.detalhes_autor_en;
        }
        if (req.body.estilo_escrita_pt !== undefined) {
            livro.estilo_escrita_pt = req.body.estilo_escrita_pt;
        }
        if (req.body.estilo_escrita_en !== undefined) {
            livro.estilo_escrita_en = req.body.estilo_escrita_en;
        }
        if (req.body.verossimilhanca_pt !== undefined) {
            livro.verossimilhanca_pt = req.body.verossimilhanca_pt;
        }
        if (req.body.verossimilhanca_en !== undefined) {
            livro.verossimilhanca_en = req.body.verossimilhanca_en;
        }
        if (req.body.caracteristicas_literarias_pt !== undefined) {
            livro.caracteristicas_literarias_pt = req.body.caracteristicas_literarias_pt;
        }
        if (req.body.caracteristicas_literarias_en !== undefined) {
            livro.caracteristicas_literarias_en = req.body.caracteristicas_literarias_en;
        }
        if (req.body.conclusao_pt !== undefined) {
            livro.conclusao_pt = req.body.conclusao_pt;
        }
        if (req.body.conclusao_en !== undefined) {
            livro.conclusao_en = req.body.conclusao_en;
        }
        if (req.body.contexto_historico_pt !== undefined) {
            livro.contexto_historico_pt = req.body.contexto_historico_pt;
        }
        if (req.body.contexto_historico_en !== undefined) {
            livro.contexto_historico_en = req.body.contexto_historico_en;
        }
        if (req.body.simbolismo_pt !== undefined) {
            livro.simbolismo_pt = req.body.simbolismo_pt;
        }
        if (req.body.simbolismo_en !== undefined) {
            livro.simbolismo_en = req.body.simbolismo_en;
        }
        if (req.body.engajamento_pt !== undefined) {
            livro.engajamento_pt = req.body.engajamento_pt;
        }
        if (req.body.engajamento_en !== undefined) {
            livro.engajamento_en = req.body.engajamento_en;
        }
        if (req.body.temas_chave_pt !== undefined) {
            livro.temas_chave_pt = req.body.temas_chave_pt;
        }
        if (req.body.temas_chave_en !== undefined) {
            livro.temas_chave_en = req.body.temas_chave_en;
        }
        if (req.body.video_url !== undefined) {
            livro.video_url = req.body.video_url;
        }
        if (req.body.capa_url !== undefined) {
            livro.capa_url = req.body.capa_url;
        }
        if (req.body.usuarioId !== undefined) {
            livro.usuarioId = req.body.usuarioId ? parseInt(req.body.usuarioId) : null;
        }

        const data = await livro.atualizar();

        return res.json({ message: `O livro "${data.titulo}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        return res.status(500).json({ error: 'Erro ao atualizar livro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const livro = await LivroModel.buscarPorId(parseInt(id));

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
