import { buscarLivrosExternos, buscarLivrosRana, buscarLivrosClubyx, buscarLivroClubyxPorId, bookService } from '../lib/services/livrosService.js';
import { buscarLivrosClubyxRaw } from '../lib/services/livrosService.js';

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

            contexto_historico_pt,
            contexto_historico_en,

            simbolismo_pt,
            simbolismo_en,

            engajamento_pt,
            engajamento_en,

            temas_chave_pt,
            temas_chave_en,

            personagens,

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
            contexto_historico_pt: contexto_historico_pt ?? null,
            contexto_historico_en: contexto_historico_en ?? null,

            simbolismo_pt: simbolismo_pt ?? null,
            simbolismo_en: simbolismo_en ?? null,

            engajamento_pt: engajamento_pt ?? null,
            engajamento_en: engajamento_en ?? null,

            temas_chave_pt: temas_chave_pt ?? null,
            temas_chave_en: temas_chave_en ?? null,

            personagens: personagens ?? null,

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

export const importarLivroClubyx = async (req, res) => {
    try {
        const { titulo, usuarioId, id } = req.body || {};

        if (!titulo && !id) {
            return res.status(400).json({ error: 'Envie `titulo` (ou `id`) para importar.' });
        }

        function normalize(str = '') {
            return str
                .toString()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replace(/[^\w\s]/g, '')
                .toLowerCase()
                .trim();
        }

        let encontrado = null;

        // se id for enviado, buscar diretamente por id
        if (id) {
            try {
                encontrado = await buscarLivroClubyxPorId(id);
            } catch (err) {
                // se falhar, continuamos para tentar buscar por título
                console.error('Erro ao buscar Clubyx por id, tentando busca por título:', err.message);
            }
        }

        // se não encontrou por id, procurar por título na lista
        if (!encontrado) {
            const lista = await buscarLivrosClubyx();

            const target = normalize(titulo || '');

            if (Array.isArray(lista)) {
                encontrado = lista.find((item) => {
                    const t = normalize(item.title || item.titulo || '');
                    return t === target || t.includes(target) || target.includes(t);
                });
            } else if (lista && (lista.title || lista.titulo)) {
                const t = normalize(lista.title || lista.titulo || '');
                if (t === target || t.includes(target) || target.includes(t)) encontrado = lista;
            }
        }

        if (!encontrado) {
            return res.status(404).json({ error: 'Livro não encontrado na API Clubyx.' });
        }

        // salvar no banco usando a função já existente
        const salvo = await bookService.salvarLivroNoBanco(encontrado, usuarioId ? parseInt(usuarioId) : null);

        return res.status(201).json({ message: 'Livro importado do Clubyx e salvo com sucesso!', data: salvo });
    } catch (error) {
        console.error('Erro ao importar livro Clubyx:', error);
        return res.status(500).json({ error: 'Erro ao importar o livro Clubyx.' });
    }
};

export const listarClubyx = async (req, res) => {
    try {
        const dados = await buscarLivrosClubyx();

        const mapped = Array.isArray(dados) ? dados.map(mapExternalToInternal) : mapExternalToInternal(dados);

        return res.status(200).json({ data: mapped });
    } catch (error) {
        console.error('Erro ao listar Clubyx:', error);
        const payload = {
            error: 'Não foi possível carregar os livros Clubyx no momento.',
            data: [],
        };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }

        return res.status(500).json(payload);
    }
};

export const listarTodasIntegracoes = async (req, res) => {
    try {
        // buscar todas as fontes em paralelo
        const [bookverseRes, ranaRes, clubyxRes] = await Promise.all([
            buscarLivrosExternos().catch((e) => {
                console.warn('Bookverse falhou:', e && e.message);
                return [];
            }),
            buscarLivrosRana().catch((e) => {
                console.warn('Rana falhou:', e && e.message);
                return [];
            }),
            buscarLivrosClubyx().catch((e) => {
                console.warn('Clubyx falhou:', e && e.message);
                return [];
            }),
        ]);

        // preparar metadados por fonte para diagnóstico
        const lists = [bookverseRes, ranaRes, clubyxRes];

        const mappedLists = lists.flatMap((list) => {
            if (!list) return [];
            if (Array.isArray(list)) return list.map(mapExternalToInternal);
            return [mapExternalToInternal(list)];
        });

        // deduplicar por título normalizado
        const normalize = (s = '') =>
            s
                .toString()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replace(/[^\w\s]/g, '')
                .toLowerCase()
                .trim();

        const seen = new Set();
        const deduped = [];
        for (const item of mappedLists) {
            const key = normalize(item.titulo || item.title || '');

            if (!key) {
                deduped.push(item);
                continue;
            }

            if (!seen.has(key)) {
                seen.add(key);
                deduped.push(item);
            }
        }

        // montar metadados com contagem e possíveis erros por fonte
        const sources = [];

        for (const src of [{ name: 'Bookverse', raw: bookverseRes }, { name: 'Rana', raw: ranaRes }, { name: 'Clubyx', raw: clubyxRes }]) {
            const { name, raw } = src;
            let count = 0;
            let error = false;
            let detail = null;

            if (!raw) {
                count = 0;
            } else if (raw.__success) {
                const payload = raw.data;
                count = Array.isArray(payload) ? payload.length : 1;
            } else if (raw.__rawError) {
                error = true;
                detail = raw.attempts || raw.body || raw;
            } else if (Array.isArray(raw)) {
                count = raw.length;
            } else {
                count = 1;
            }

            sources.push({ name, count, error, detail });
        }

        return res.status(200).json({ data: deduped, meta: { total: deduped.length, sources } });
    } catch (error) {
        console.error('Erro ao listar todas integrações:', error);
        return res.status(500).json({ error: 'Erro ao reunir integrações externas.' });
    }
};

export const listarClubyxRaw = async (req, res) => {
    try {
        const raw = await buscarLivrosClubyxRaw();

        if (raw.success) {
            return res.status(200).json({ ok: true, headersUsed: raw.headersUsed, body: raw.body });
        }

        return res.status(200).json({ ok: false, attempts: raw.attempts });
    } catch (error) {
        console.error('Erro ao buscar Clubyx raw:', error);
        return res.status(500).json({ error: 'Erro ao buscar Clubyx raw.' });
    }
};

export const listarClubyxProbe = async (req, res) => {
    try {
        const raw = await buscarLivrosClubyxRaw();

        // retornar formato detalhado para diagnóstico
        return res.status(200).json(raw);
    } catch (error) {
        console.error('Erro ao probe Clubyx:', error);
        return res.status(500).json({ error: 'Erro ao executar probe Clubyx.' });
    }
};

export const listarClubyxFull = async (req, res) => {
    try {
        const dados = await buscarLivrosClubyx();

        // retornar a resposta completa da API Clubyx sem mapear
        return res.status(200).json({ data: dados });
    } catch (error) {
        console.error('Erro ao buscar Clubyx full:', error);
        return res.status(500).json({ error: 'Erro ao buscar Clubyx full.' });
    }
};