import { buscarLivrosExternos, buscarLivrosRana, bookService } from '../lib/services/livrosService.js';

function mapExternalToInternal(external = {}) {
    return {
        titulo: external.title || external.titulo || null,
        autor: external.author || external.autor || null,
        anoPublicacao: external.publishedYear
            ? parseInt(external.publishedYear)
            : external.year
            ? parseInt(external.year)
            : null,
        sinopse: external.synopsis || external.description || external.sinopse || null,

        genero_pt: external.genrePt || external.genero_pt || external.genre_pt || 'Geral',
        genero_en: external.genreEn || external.genero_en || external.genre_en || 'General',

        contexto_pt: external.historicalContextPt || external.contexto_historico_pt || external.contexto_pt || null,
        contexto_en: external.historicalContextEn || external.contexto_historico_en || external.contexto_en || null,

        descricao_pt: external.descriptionPt || external.descricao_pt || null,
        descricao_en: external.descriptionEn || external.descricao_en || null,

        detalhes_autor_pt: external.detailsAuthorPt || external.detalhes_autor_pt || null,
        detalhes_autor_en: external.detailsAuthorEn || external.detalhes_autor_en || null,

        estilo_escrita_pt: external.writingStylePt || external.estilo_escrita_pt || null,
        estilo_escrita_en: external.writingStyleEn || external.estilo_escrita_en || null,

        verossimilhanca_pt: external.verossimilhancaPt || external.verossimilhanca_pt || null,
        verossimilhanca_en: external.verossimilhancaEn || external.verossimilhanca_en || null,

        caracteristicas_literarias_pt: external.characteristicsPt || external.caracteristicas_literarias_pt || external.caracteristicas_pt || null,
        caracteristicas_literarias_en: external.characteristicsEn || external.caracteristicas_literarias_en || external.caracteristicas_en || null,

        conclusao_pt: external.conclusionPt || external.conclusao_pt || null,
        conclusao_en: external.conclusionEn || external.conclusao_en || null,

        video_url: external.videoUrl || external.video_url || null,
        capa_url: external.coverUrl || external.capa_url || external.capaUrl || null,

        usuarioId: null,
    };
}

export const listarLivrosExternos = async (req, res) => {
    try {
        const dados = await buscarLivrosExternos();

        const mapped = Array.isArray(dados) ? dados.map(mapExternalToInternal) : dados;

        return res.status(200).json({
            data: mapped,
        });
    } catch (error) {
        console.error('Erro ao buscar livros externos:', error);

        const payload = {
            error: 'Não foi possível carregar os livros externos no momento.',
            data: [],
        };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }

        return res.status(500).json(payload);
    }
};

export const listarLivrosRana = async (req, res) => {
    try {
        const dados = await buscarLivrosRana();

        const mapped = Array.isArray(dados) ? dados.map(mapExternalToInternal) : dados;

        return res.status(200).json({
            data: mapped,
        });
    } catch (error) {
        console.error('Erro ao buscar livros Rana:', error);

        const payload = {
            error: 'Não foi possível carregar os livros Rana no momento.',
            data: [],
        };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }

        return res.status(200).json(payload);
    }
};

export const buscarLivroExternoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const dados = await bookService.buscarLivroExterno(id);

        const mapped = mapExternalToInternal(dados);

        return res.status(200).json({ data: mapped });
    } catch (error) {
        console.error('Erro ao buscar livro externo por id:', error);
        const payload = {
            error: 'Não foi possível carregar o livro externo no momento.',
            data: null,
        };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }

        return res.status(500).json(payload);
    }
};

export const criarLivroExterno = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
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

            video_url,
            capa_url,
            usuarioId,
        } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: 'O campo "titulo" é obrigatório!'
            });
        }

        if (!autor) {
            return res.status(400).json({
                error: 'O campo "autor" é obrigatório!'
            });
        }

        if (!genero_pt) {
            return res.status(400).json({
                error: 'O campo "genero_pt" é obrigatório!'
            });
        }

        if (!genero_en) {
            return res.status(400).json({
                error: 'O campo "genero_en" é obrigatório!'
            });
        }

        const livroData = {
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

            video_url: video_url ?? null,
            capa_url: capa_url ?? null,

            usuarioId: usuarioId ? parseInt(usuarioId) : null,
        };

        const data = await bookService.salvarLivroNoBanco(livroData, usuarioId);

        return res.status(201).json({
            message: 'Livro externo criado e salvo com sucesso!',
            data
        });

    } catch (error) {
        console.error('Erro ao criar livro externo:', error);

        return res.status(500).json({
            error: 'Erro interno ao salvar o livro externo.'
        });
    }
};