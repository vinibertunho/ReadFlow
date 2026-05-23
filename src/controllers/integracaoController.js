import prisma from '../lib/services/prismaClient.js';

const ENDPOINTS_CONFIG = [
    {
        nomeLivro: 'O Guarani',
        urlCompleta: 'https://bookpedia-backend-4ab3.onrender.com/livros',
        apiKey: process.env.KEY_LIVRO_O_GUARANI || 'projetoamods',
    },
    {
        nomeLivro: 'Quartos de despejo',
        urlCompleta: 'https://backend-projeto-integrador-rana.onrender.com/api/livro',
        apiKey: process.env.KEY_LIVRO_QUARTOS_DESPEJO || 'projetoamods',
    },
    {
        nomeLivro: 'Memórias Póstumas de Brás Cubas',
        urlCompleta: 'https://projeto-clubyx.onrender.com/livros',
        apiKey: process.env.KEY_LIVRO_MEMORIAS || 'projetoamods',
    },
    {
        nomeLivro: 'Bookverse',
        urlCompleta: 'https://bookverse-back-pob5.onrender.com/livros',
        apiKey: process.env.BOOKVERSE_API_KEY || 'projetoamods',
    }
];

async function fazerRequisicaoExterna(endpoint) {
    if (!endpoint.urlCompleta || !endpoint.apiKey) {
        return null;
    }

    const response = await fetch(endpoint.urlCompleta, {
        method: 'GET',
        headers: {
            'x-api-key': endpoint.apiKey,
            'Authorization': `Bearer ${endpoint.apiKey}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const responseText = await response.text().catch(() => '');
        throw new Error(
            `Erro na API ${endpoint.nomeLivro}: ${response.status} ${response.statusText}${responseText ? ` - ${responseText}` : ''}`,
        );
    }

    return response.json();
}

function mapExternalToInternal(external = {}) {
    return {
        titulo: external.titulo || external.title || external.tituloDoLivro || external.tituloPT || null,
        autor: external.autor || external.author || external.autores || external.nome || null,
        anoPublicacao: external.anoPublicacao ? parseInt(external.anoPublicacao) : external.ano ? parseInt(external.ano) : external.year ? parseInt(external.year) : null,
        paginas: external.paginas ? parseInt(external.paginas) : external.pages ? parseInt(external.pages) : null,
        capa_url: external.capa_url || external.capa || external.image || external.capaURL || external.foto || null,
        video_url: external.video_url || external.videoUrl || null,
        
        genero_pt: external.genero_pt || external.genero || external.generoPT || external.genrePt || null,
        genero_en: external.genero_en || external.genre || external.generoEN || external.genreEn || null,
        
        sinopse: external.sinopse || external.description || external.resumo || external.enredo_pt || external.synopsis || null,
        descricao_pt: external.descricao_pt || external.descriptionPt || null,
        descricao_en: external.descricao_en || external.descriptionEn || null,
        
        personagens_pt: external.personagens_pt || (Array.isArray(external.personagens) ? external.personagens.join('\n') : external.personagens) || null,
        personagens_en: external.personagens_en || (Array.isArray(external.personagensEn) ? external.personagensEn.join('\n') : external.personagensEn) || null,

        contexto_historico_pt: external.contexto_historico_pt || external.contexto_pt || external.contextPt || external.historicalContextPt || null,
        contexto_historico_en: external.contexto_historico_en || external.contexto_en || external.contextEn || external.historicalContextEn || null,

        detalhes_autor_pt: external.detalhes_autor_pt || external.aboutAuthorPt || null,
        detalhes_autor_en: external.detalhes_autor_en || external.aboutAuthorEn || null,
        estilo_escrita_pt: external.estilo_escrita_pt || external.writingStylePt || null,
        estilo_escrita_en: external.estilo_escrita_en || external.writingStyleEn || null,
        verossimilhanca_pt: external.verossimilhanca_pt || external.verisimilitudePt || null,
        verossimilhanca_en: external.verossimilhanca_en || external.verisimilitudeEn || null,
        caracteristicas_literarias_pt: external.caracteristicas_literarias_pt || external.literaryFeaturesPt || null,
        caracteristicas_literarias_en: external.caracteristicas_literarias_en || external.literaryFeaturesEn || null,
        conclusao_pt: external.conclusao_pt || external.conclusionPt || null,
        conclusao_en: external.conclusao_en || external.conclusionEn || null,

        simbolismo_pt: external.simbolismo_pt || external.symbolismPt || null,
        simbolismo_en: external.simbolismo_en || external.symbolismEn || null,
        engajamento_pt: external.engajamento_pt || external.engagementPt || null,
        engajamento_en: external.engajamento_en || external.engagementEn || null,
        temas_chave_pt: external.temas_chave_pt || external.keyThemesPt || null,
        temas_chave_en: external.temas_chave_en || external.keyThemesEn || null,

        usuarioId: null,
    };
}

async function salvarLivroNoBanco(dadosLivroExterno, usuarioId = null) {
    const mapeado = mapExternalToInternal(dadosLivroExterno);

    const novoLivro = await prisma.livro.create({
        data: {
            titulo: mapeado.titulo || 'Título Desconhecido',
            autor: mapeado.autor || 'Autor Desconhecido',
            anoPublicacao: mapeado.anoPublicacao,
            paginas: mapeado.paginas,
            capa_url: mapeado.capa_url,
            video_url: mapeado.video_url,
            genero_pt: mapeado.genero_pt,
            genero_en: mapeado.genero_en,
            sinopse: mapeado.sinopse,
            descricao_pt: mapeado.descricao_pt,
            descricao_en: mapeado.descricao_en,
            personagens_pt: mapeado.personagens_pt,
            personagens_en: mapeado.personagens_en,
            contexto_historico_pt: mapeado.contexto_historico_pt,
            contexto_historico_en: mapeado.contexto_historico_en,
            detalhes_autor_pt: mapeado.detalhes_autor_pt,
            detalhes_autor_en: mapeado.detalhes_autor_en,
            estilo_escrita_pt: mapeado.estilo_escrita_pt,
            estilo_escrita_en: mapeado.estilo_escrita_en,
            verossimilhanca_pt: mapeado.verossimilhanca_pt,
            verossimilhanca_en: mapeado.verossimilhanca_en,
            caracteristicas_literarias_pt: mapeado.caracteristicas_literarias_pt,
            caracteristicas_literarias_en: mapeado.caracteristicas_literarias_en,
            conclusao_pt: mapeado.conclusao_pt,
            conclusao_en: mapeado.conclusao_en,
            simbolismo_pt: mapeado.simbolismo_pt,
            simbolismo_en: mapeado.simbolismo_en,
            engajamento_pt: mapeado.engajamento_pt,
            engajamento_en: mapeado.engajamento_en,
            temas_chave_pt: mapeado.temas_chave_pt,
            temas_chave_en: mapeado.temas_chave_en,
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
            console.warn(err.message || err);
        }
    }

    return novoLivro;
}

const normalize = (str = '') =>
    str
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^\w\s]/g, '')
        .toLowerCase()
        .trim();

export const obterBibliotecaCompleta = async (req, res) => {
    try {
        const promessas = ENDPOINTS_CONFIG.map(async (livro) => {
            try {
                if (!livro.urlCompleta || !livro.apiKey) {
                    return {
                        livro: livro.nomeLivro,
                        statusApi: 'Configuração Ausente',
                        conteudo: []
                    };
                }

                const resposta = await fetch(livro.urlCompleta, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': livro.apiKey,
                        'Authorization': `Bearer ${livro.apiKey}`,
                    },
                });

                if (!resposta.ok) {
                    return {
                        livro: livro.nomeLivro,
                        statusApi: `Erro HTTP ${resposta.status}`,
                        conteudo: []
                    };
                }

                const dadosBrutos = await resposta.json();
                const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : dadosBrutos ? [dadosBrutos] : [];

                const dadosFormatados = listaDeLivros.map((item) => {
                    const mapped = mapExternalToInternal(item);

                    if (mapped.titulo?.toLowerCase().includes('nao informado') && mapped.autor?.toLowerCase().includes('memorias postumas')) {
                        mapped.titulo = "Memórias Póstumas de Brás Cubas";
                        mapped.autor = "Machado de Assis";
                    }

                    return mapped;
                });

                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Online',
                    conteudo: dadosFormatados,
                };

            } catch (erroLivro) {
                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Erro Interno na Requisição',
                    conteudo: [],
                };
            }
        });

        const bibliotecaCompleta = await Promise.all(promessas);
        return res.status(200).json(bibliotecaCompleta);

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const listarIntegracao = async (req, res) => {
    try {
        const chamadas = ENDPOINTS_CONFIG.map(endpoint => 
            fazerRequisicaoExterna(endpoint).catch(() => [])
        );

        const resultados = await Promise.all(chamadas);

        const mappedLists = ENDPOINTS_CONFIG.flatMap((endpoint, index) => {
            const raw = resultados[index];
            if (!raw) return [];

            const lista = Array.isArray(raw) ? raw : [raw];
            return lista.map((item) => {
                const normalizado = mapExternalToInternal(item);

                if (
                    (!normalizado.titulo || normalizado.titulo.toLowerCase().includes('nao informado')) &&
                    (normalizado.autor && normalizado.autor.toLowerCase().includes('memorias postumas'))
                ) {
                    normalizado.titulo = "Memórias Póstumas de Brás Cubas";
                    normalizado.autor = "Machado de Assis";
                }

                return {
                    ...normalizado,
                    fonte: endpoint.nomeLivro,
                };
            });
        });

        const vistos = new Set();
        const deduped = [];

        for (const item of mappedLists) {
            const chave = normalize(item.titulo || '');

            if (!chave) {
                deduped.push(item);
                continue;
            }

            if (!vistos.has(chave)) {
                vistos.add(chave);
                deduped.push(item);
            } else {
                const indexExistente = deduped.findIndex(d => normalize(d.titulo) === chave);
                if (indexExistente !== -1) {
                    if (!deduped[indexExistente].capa_url && item.capa_url) {
                        deduped[indexExistente].capa_url = item.capa_url;
                    }
                    if ((!deduped[indexExistente].sinopse || deduped[indexExistente].sinopse.includes('não informado')) && item.sinopse) {
                        deduped[indexExistente].sinopse = item.sinopse;
                    }
                    if (!deduped[indexExistente].contexto_historico_pt && item.contexto_historico_pt) {
                        deduped[indexExistente].contexto_historico_pt = item.contexto_historico_pt;
                    }
                    if (!deduped[indexExistente].simbolismo_pt && item.simbolismo_pt) {
                        deduped[indexExistente].simbolismo_pt = item.simbolismo_pt;
                    }
                }
            }
        }

        return res.status(200).json({
            data: deduped,
            meta: {
                total: deduped.length,
            },
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const importarTodosOsLivros = async (req, res) => {
    try {
        const { usuarioId } = req.body || {};
        
        const chamadas = ENDPOINTS_CONFIG.map(endpoint => 
            fazerRequisicaoExterna(endpoint).catch(() => [])
        );
        const resultados = await Promise.all(chamadas);
        
        const todosOsLivros = resultados.flat().filter(Boolean);

        if (todosOsLivros.length === 0) {
            return res.status(404).json({ error: 'Nenhum livro encontrado nas APIs parceiras.' });
        }

        const vistos = new Set();
        const importados = [];
        const ignorados = [];

        for (const livro of todosOsLivros) {
            let tituloDefinitivo = livro.titulo || livro.title || livro.tituloDoLivro || '';
            let autorDefinitivo = livro.autor || livro.author || livro.autores || '';

            if (tituloDefinitivo.toLowerCase().includes('nao informado') && autorDefinitivo.toLowerCase().includes('memorias postumas')) {
                livro.titulo = "Memórias Póstumas de Brás Cubas";
                livro.autor = "Machado de Assis";
                tituloDefinitivo = "Memórias Póstumas de Brás Cubas";
            }

            const chave = normalize(tituloDefinitivo);

            if (!chave || vistos.has(chave)) {
                ignorados.push(tituloDefinitivo || null);
                continue;
            }

            vistos.add(chave);

            try {
                const salvo = await salvarLivroNoBanco(livro, usuarioId ? parseInt(usuarioId) : null);
                importados.push(salvo);
            } catch (err) {
                ignorados.push(tituloDefinitivo || null);
            }
        }

        return res.status(201).json({
            message: 'Importação concluída',
            data: importados,
            meta: {
                totalEncontrados: todosOsLivros.length,
                totalImportados: importados.length,
                totalIgnorados: ignorados.filter(Boolean).length,
            },
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};