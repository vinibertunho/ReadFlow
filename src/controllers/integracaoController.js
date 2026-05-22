import prisma from '../lib/services/prismaClient.js';

const EXTERNAL_API_KEY = process.env.BOOKVERSE_API_KEY;
const EXTERNAL_API_URL = 'https://bookverse-back-pob5.onrender.com/livros';

const RANA_API_KEY = process.env.RANA_API_KEY;
const RANA_API_URL = process.env.RANA_API_URL || 'https://api-rana.onrender.com/livros';

const CLUBYX_API_KEY = 'Clubyx_dev';
const CLUBYX_API_URL = 'https://projeto-clubyx.onrender.com/livros';

async function fazerRequisicaoExterna(url) {
    if (!EXTERNAL_API_KEY) {
        return null;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${EXTERNAL_API_KEY}`,
            'x-api-key': EXTERNAL_API_KEY,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const responseText = await response.text().catch(() => '');
        throw new Error(
            `Erro na API externa: ${response.status} ${response.statusText}${responseText ? ` - ${responseText}` : ''}`,
        );
    }

    return response.json();
}

async function fazerRequisicaoRana(url) {
    if (!RANA_API_KEY) {
        return null;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': RANA_API_KEY,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const responseText = await response.text().catch(() => '');
        throw new Error(
            `Erro na API Rana: ${response.status} ${response.statusText}${responseText ? ` - ${responseText}` : ''}`,
        );
    }

    return response.json();
}

async function fazerRequisicaoClubyx(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': CLUBYX_API_KEY,
            API_KEY: CLUBYX_API_KEY,
            Authorization: `Bearer ${CLUBYX_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const responseText = await response.text().catch(() => '');
        throw new Error(
            `Erro na API Clubyx: ${response.status} ${response.statusText}${responseText ? ` - ${responseText}` : ''}`,
        );
    }

    return response.json();
}

function mapExternalToInternal(external = {}) {
    return {
        titulo: external.title || external.titulo || null,
        autor: external.author || external.autor || null,
        anoPublicacao: external.publishedYear ? parseInt(external.publishedYear) : external.year ? parseInt(external.year) : null,
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

async function salvarLivroNoBanco(dadosLivroExterno, usuarioId = null) {
    const novoLivro = await prisma.livro.create({
        data: {
            titulo: dadosLivroExterno.title || dadosLivroExterno.titulo || 'Título Desconhecido',
            autor: dadosLivroExterno.author || dadosLivroExterno.autor || 'Autor Desconhecido',
            anoPublicacao: dadosLivroExterno.publishedYear || dadosLivroExterno.year || null,
            sinopse: dadosLivroExterno.synopsis || dadosLivroExterno.description || dadosLivroExterno.sinopse || null,
            genero_pt: dadosLivroExterno.genrePt || dadosLivroExterno.genero_pt || 'Geral',
            genero_en: dadosLivroExterno.genreEn || dadosLivroExterno.genero_en || 'General',
            contexto_pt: dadosLivroExterno.contexto_pt || dadosLivroExterno.contextPt || null,
            contexto_en: dadosLivroExterno.contexto_en || dadosLivroExterno.contextEn || null,
            descricao_pt: dadosLivroExterno.descricao_pt || dadosLivroExterno.descriptionPt || null,
            descricao_en: dadosLivroExterno.descricao_en || dadosLivroExterno.descriptionEn || null,
            detalhes_autor_pt: dadosLivroExterno.detalhes_autor_pt || dadosLivroExterno.detailsAuthorPt || null,
            detalhes_autor_en: dadosLivroExterno.detalhes_autor_en || dadosLivroExterno.detailsAuthorEn || null,
            estilo_escrita_pt: dadosLivroExterno.estilo_escrita_pt || dadosLivroExterno.writingStylePt || null,
            estilo_escrita_en: dadosLivroExterno.estilo_escrita_en || dadosLivroExterno.writingStyleEn || null,
            verossimilhanca_pt: dadosLivroExterno.verossimilhanca_pt || dadosLivroExterno.verossimilhancaPt || null,
            verossimilhanca_en: dadosLivroExterno.verossimilhanca_en || dadosLivroExterno.verossimilhancaEn || null,
            caracteristicas_literarias_pt: dadosLivroExterno.caracteristicas_literarias_pt || dadosLivroExterno.characteristicsPt || null,
            caracteristicas_literarias_en: dadosLivroExterno.caracteristicas_literarias_en || dadosLivroExterno.characteristicsEn || null,
            conclusao_pt: dadosLivroExterno.conclusao_pt || dadosLivroExterno.conclusionPt || null,
            conclusao_en: dadosLivroExterno.conclusao_en || dadosLivroExterno.conclusionEn || null,
            contexto_historico_pt: dadosLivroExterno.contexto_historico_pt || dadosLivroExterno.historicalContextPt || null,
            contexto_historico_en: dadosLivroExterno.contexto_historico_en || dadosLivroExterno.historicalContextEn || null,
            simbolismo_pt: dadosLivroExterno.simbolismo_pt || dadosLivroExterno.symbolismPt || null,
            simbolismo_en: dadosLivroExterno.simbolismo_en || dadosLivroExterno.symbolismEn || null,
            engajamento_pt: dadosLivroExterno.engajamento_pt || dadosLivroExterno.engagementPt || null,
            engajamento_en: dadosLivroExterno.engajamento_en || dadosLivroExterno.engagementEn || null,
            temas_chave_pt: dadosLivroExterno.temas_chave_pt || dadosLivroExterno.keyThemesPt || null,
            temas_chave_en: dadosLivroExterno.temas_chave_en || dadosLivroExterno.keyThemesEn || null,
            video_url: dadosLivroExterno.video_url || dadosLivroExterno.videoUrl || null,
            capa_url: dadosLivroExterno.capa_url || dadosLivroExterno.coverUrl || null,
            usuarioId,
        },
    });

    if (dadosLivroExterno.personagens && Array.isArray(dadosLivroExterno.personagens) && dadosLivroExterno.personagens.length > 0) {
        const personagensData = dadosLivroExterno.personagens.map((p) => ({
            livroId: novoLivro.id,
            nome: p.nome || p.name || String(p).slice(0, 200),
            descricao: p.descricao || p.description || null,
        }));

        try {
            await prisma.personagem.createMany({ data: personagensData });
        } catch (err) {
            console.warn('Não foi possível inserir personagens:', err.message || err);
        }
    }

    return novoLivro;
}

export const listarLivrosExternos = async (req, res) => {
    try {
        const dados = await fazerRequisicaoExterna(EXTERNAL_API_URL);
        const mapped = Array.isArray(dados) ? dados.map(mapExternalToInternal) : dados;

        return res.status(200).json({ data: mapped });
    } catch (error) {
        console.error('Erro ao buscar livros externos:', error);
        const payload = { error: 'Não foi possível carregar os livros externos no momento.', data: [] };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }
        return res.status(500).json(payload);
    }
};

export const listarLivrosRana = async (req, res) => {
    try {
        const dados = await fazerRequisicaoRana(RANA_API_URL);
        const mapped = Array.isArray(dados) ? dados.map(mapExternalToInternal) : dados;

        return res.status(200).json({ data: mapped });
    } catch (error) {
        console.error('Erro ao buscar livros Rana:', error);
        const payload = { error: 'Não foi possível carregar os livros Rana no momento.', data: [] };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }
        return res.status(200).json(payload);
    }
};

export const listarClubyx = async (req, res) => {
    try {
        const dados = await fazerRequisicaoClubyx(CLUBYX_API_URL);
        const mapped = Array.isArray(dados) ? dados.map(mapExternalToInternal) : mapExternalToInternal(dados);

        return res.status(200).json({ data: mapped });
    } catch (error) {
        console.error('Erro ao listar Clubyx:', error);
        const payload = { error: 'Não foi possível carregar os livros Clubyx no momento.', data: [] };
        if (process.env.NODE_ENV !== 'production') {
            payload.detail = (error && error.message) || String(error);
        }
        return res.status(500).json(payload);
    }
};

export const listarClubyxRaw = async (req, res) => {
    try {
        const response = await fetch(CLUBYX_API_URL, {
            method: 'GET',
            headers: {
                'x-api-key': CLUBYX_API_KEY,
                API_KEY: CLUBYX_API_KEY,
                Authorization: `Bearer ${CLUBYX_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const text = await response.text().catch(() => '');

        return res.status(200).json({ ok: response.ok, status: response.status, statusText: response.statusText, body: text });
    } catch (error) {
        console.error('Erro ao buscar Clubyx raw:', error);
        return res.status(500).json({ error: 'Erro ao buscar Clubyx raw.' });
    }
};

export const listarClubyxFull = async (req, res) => {
    try {
        const dados = await fazerRequisicaoClubyx(CLUBYX_API_URL);
        return res.status(200).json({ data: dados });
    } catch (error) {
        console.error('Erro ao buscar Clubyx full:', error);
        return res.status(500).json({ error: 'Erro ao buscar Clubyx full.' });
    }
};

export const importarLivroClubyx = async (req, res) => {
    try {
        const { usuarioId } = req.body || {};
        const dados = await fazerRequisicaoClubyx(CLUBYX_API_URL);
        const livros = Array.isArray(dados) ? dados : dados ? [dados] : [];

        if (livros.length === 0) {
            return res.status(404).json({ error: 'Nenhum livro encontrado na API Clubyx.' });
        }

        const normalize = (str = '') =>
            str
                .toString()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replace(/[^\w\s]/g, '')
                .toLowerCase()
                .trim();

        const vistos = new Set();
        const importados = [];
        const ignorados = [];

        for (const livro of livros) {
            const chave = normalize(livro.title || livro.titulo || '');

            if (!chave || vistos.has(chave)) {
                ignorados.push(livro.title || livro.titulo || null);
                continue;
            }

            vistos.add(chave);

            try {
                const salvo = await salvarLivroNoBanco(livro, usuarioId ? parseInt(usuarioId) : null);
                importados.push(salvo);
            } catch (err) {
                console.error('Erro ao salvar livro Clubyx:', err.message || err);
                ignorados.push(livro.title || livro.titulo || null);
            }
        }

        return res.status(201).json({
            message: 'Importação em lote do Clubyx concluída com sucesso!',
            data: importados,
            meta: {
                totalEncontrados: livros.length,
                totalImportados: importados.length,
                totalIgnorados: ignorados.filter(Boolean).length,
            },
        });
    } catch (error) {
        console.error('Erro ao importar livro Clubyx:', error);
        return res.status(500).json({ error: 'Erro ao importar os livros Clubyx.' });
    }
};

export const listarIntegracao = async (req, res) => {
    try {
        const [bookverseRes, ranaRes, clubyxRes] = await Promise.all([
            fazerRequisicaoExterna(EXTERNAL_API_URL).catch((error) => {
                console.warn('Bookverse falhou:', error && error.message);
                return [];
            }),
            fazerRequisicaoRana(RANA_API_URL).catch((error) => {
                console.warn('Rana falhou:', error && error.message);
                return [];
            }),
            fazerRequisicaoClubyx(CLUBYX_API_URL).catch((error) => {
                console.warn('Clubyx falhou:', error && error.message);
                return [];
            }),
        ]);

        const fontes = [
            { name: 'Bookverse', raw: bookverseRes },
            { name: 'Rana', raw: ranaRes },
            { name: 'Clubyx', raw: clubyxRes },
        ];

        const mappedLists = fontes.flatMap(({ raw, name }) => {
            if (!raw) return [];

            const lista = Array.isArray(raw) ? raw : [raw];
            return lista.map((item) => ({
                ...mapExternalToInternal(item),
                fonte: name,
            }));
        });

        const normalize = (str = '') =>
            str
                .toString()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replace(/[^\w\s]/g, '')
                .toLowerCase()
                .trim();

        const vistos = new Set();
        const deduped = [];

        for (const item of mappedLists) {
            const chave = normalize(item.titulo || item.title || '');

            if (!chave) {
                deduped.push(item);
                continue;
            }

            if (!vistos.has(chave)) {
                vistos.add(chave);
                deduped.push(item);
            }
        }

        return res.status(200).json({
            data: deduped,
            meta: {
                total: deduped.length,
                fontes: fontes.map(({ name, raw }) => ({
                    nome: name,
                    total: Array.isArray(raw) ? raw.length : raw ? 1 : 0,
                })),
            },
        });
    } catch (error) {
        console.error('Erro ao listar integração:', error);
        return res.status(500).json({ error: 'Erro ao reunir os livros em uma única integração.' });
    }
};

export const obterBibliotecaCompleta = async (req, res) => {
    try {
        const endpointsLivros = [
            {
                nomeLivro: 'Bookverse',
                urlCompleta: EXTERNAL_API_URL,
                apiKey: process.env.BOOKVERSE_API_KEY,
                tipoAuth: 'x-api-key',
            },
            {
                nomeLivro: 'Rana',
                urlCompleta: RANA_API_URL,
                apiKey: process.env.RANA_API_KEY,
                tipoAuth: 'x-api-key',
            },
            {
                nomeLivro: 'Clubyx',
                urlCompleta: CLUBYX_API_URL,
                apiKey: process.env.KEY_LIVRO_MEMORIAS || CLUBYX_API_KEY,
                tipoAuth: 'x-api-key',
            },
        ];

        console.log(`Total de livros cadastrados no array: ${endpointsLivros.length}`);

        const promessas = endpointsLivros.map(async (livro, index) => {
            console.log(`[Índice ${index}] Iniciando processo para: ${livro.nomeLivro}`);

            try {
                if (!livro.urlCompleta || !livro.apiKey) {
                    console.log(`[Índice ${index}] Erro: URL ou Key faltando para ${livro.nomeLivro}`);
                    return {
                        livro: livro.nomeLivro,
                        statusApi: 'Configuração Ausente',
                        conteudo: [],
                    };
                }

                console.log(`[Índice ${index}] Disparando Fetch para: ${livro.urlCompleta}`);

                const resposta = await fetch(livro.urlCompleta, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        [livro.tipoAuth || 'x-api-key']: livro.apiKey,
                    },
                });

                console.log(`[Índice ${index}] Resposta recebida de ${livro.nomeLivro}. Status: ${resposta.status}`);

                if (!resposta.ok) {
                    return {
                        livro: livro.nomeLivro,
                        statusApi: `Erro HTTP ${resposta.status}`,
                        conteudo: [],
                    };
                }

                const dadosBrutos = await resposta.json();
                console.log(`[Índice ${index}] JSON convertido com sucesso para ${livro.nomeLivro}`);

                const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : [];

                const dadosFormatados = listaDeLivros.map((item) => ({
                    titulo:
                        item.titulo ||
                        item.title ||
                        item.tituloDoLivro ||
                        item.tituloPT ||
                        'Título não informado',
                    autor:
                        item.autor ||
                        item.author ||
                        item.autores ||
                        item.nome ||
                        'Autor não informado',
                    capa_url: item.capa || item.image || item.capaURL || item.foto || null,
                    ano: item.ano || item.year || item.anoPublicacao || item.publicacao || 'N/A',
                    genero_pt: item.genero_pt || item.genero || item.generoPT || 'Gênero não informado',
                    genero_en: item.genero_en || item.genre || item.generoEN || 'Genre not informed',
                    enredo_pt: item.enredo_pt || item.resumo || 'Enredo não informado',
                    enredo_en: item.enredo_en || item.description || item.resumoEn || 'Description not informed',
                }));

                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Online',
                    conteudo: dadosFormatados,
                };
            } catch (erroLivro) {
                console.error(`🚨 [Erro interno no mapa do livro ${livro.nomeLivro}]:`, erroLivro.message);
                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Erro Interno na Requisição',
                    conteudo: [],
                };
            }
        });

        const bibliotecaCompleta = await Promise.all(promessas);
        console.log('--- PROCESSO CONCLUÍDO COM SUCESSO ---');

        return res.status(200).json(bibliotecaCompleta);
    } catch (error) {
        console.error('💥 ERRO CRÍTICO NO CATCH PRINCIPAL:', error.message);
        return res.status(500).json({ erro: 'Erro crítico no servidor.', detalhe: error.message });
    }
};