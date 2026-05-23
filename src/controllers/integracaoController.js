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

const METADADOS_LIVROS = {
    "o guarani": {
        sinopse: "O romance narra o amor entre Peri, um índio da tribo dos goitacás, e Ceci, uma jovem moça branca, filha de um fidalgo português, no cenário do Brasil colonial do século XVII.",
        descricao_pt: "Clássico do Romantismo brasileiro que explora a formação da identidade nacional através do mito do bom selvagem.",
        personagens_pt: "Peri (O Guarani)\nCecília (Ceci)\nDom Antônio de Mariz\nDona Lauriana\nÁlvaro\nLoredano",
        contexto_historico_pt: "Romantismo brasileiro (século XIX), focado na idealização do índio como o herói nacional e a colonização do Brasil.",
        estilo_escrita_pt: "Prosa poética, idealizadora, rica em descrições da exuberante natureza tropical brasileira."
    },
    "quartos de despejo": {
        sinopse: "O diário real de Carolina Maria de Jesus relata a dura rotina de uma catadora de papel na favela do Canindé, em São Paulo, lutando diariamente contra a fome e a miséria para sustentar seus filhos.",
        descricao_pt: "Obra visceral e autobiográfica da literatura periférica e documental brasileira.",
        personagens_pt: "Carolina Maria de Jesus\nJoão José\nJosé Carlos\nVera Eunice\nOs moradores da favela do Canindé",
        contexto_historico_pt: "Brasil do final dos anos 1950, marcado pela urbanização acelerada, desigualdade social latente e o surgimento das grandes favelas.",
        estilo_escrita_pt: "Linguagem crua, direta, em formato de diário, com desvios da norma culta que trazem realismo e impacto poético."
    },
    "memorias postumas de bras cubas": {
        sinopse: "Narrado por um 'defunto autor', Brás Cubas relata suas memórias fúteis de forma irônica, expondo as hipocrisias, falhas morais e privilégios da elite aristocrática de sua época.",
        descricao_pt: "A obra-prima que inaugurou o Realismo no Brasil, célebre pela sua estrutura fragmentada e narrador não confiável.",
        personagens_pt: "Brás Cubas\nVirgília\nMarcela\nQuincas Borba\nLobo Neves\nSabina\nPrudêncio",
        contexto_historico_pt: "Segundo Reinado no Brasil (século XIX), sociedade escravocrata, patriarcal e governada por uma elite oligárquica fútil.",
        estilo_escrita_pt: "Pessimismo irônico, digressões filosóficas frequentes, metalinguagem e deboche refinado à sociedade."
    },
    "bookverse": {
        sinopse: "Uma coletânea integrada trazendo obras clássicas e contemporâneas do cenário literário brasileiro.",
        descricao_pt: "Universo literário expandido que conecta múltiplos autores e obras no ecossistema do Bookverse.",
        personagens_pt: "Capitu\nBentinho\nEscobar\nIacema\nLeonardo",
        contexto_historico_pt: "Compilado de literatura geral e clássicos integrados de forma unificada.",
        estilo_escrita_pt: "Abordagem dinâmica e diversificada com foco na experiência multiplataforma."
    }
};

const normalize = (str = '') =>
    str
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^\w\s]/g, '')
        .toLowerCase()
        .trim();

function preencherMetadadosFaltantes(mapped) {
    const chave = normalize(mapped.titulo || '');
    const metadado = METADADOS_LIVROS[chave];

    if (metadado) {
        mapped.sinopse = mapped.sinopse || metadado.sinopse;
        mapped.descricao_pt = mapped.descricao_pt || metadado.descricao_pt;
        mapped.personagens_pt = mapped.personagens_pt || metadado.personagens_pt;
        mapped.contexto_historico_pt = mapped.contexto_historico_pt || metadado.contexto_historico_pt;
        mapped.estilo_escrita_pt = mapped.estilo_escrita_pt || metadado.estilo_escrita_pt;
    }
    return mapped;
}

async function fazerRequisicaoExterna(endpoint) {
    if (!endpoint.urlCompleta || !endpoint.apiKey) return null;
    try {
        const response = await fetch(endpoint.urlCompleta, {
            method: 'GET',
            headers: {
                'x-api-key': endpoint.apiKey,
                'Authorization': `Bearer ${endpoint.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) return null;
        return response.json();
    } catch {
        return null;
    }
}

function mapExternalToInternal(external = {}) {
    let mapped = {
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
        usuarioId: null
    };

    return preencherMetadadosFaltantes(mapped);
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

    return novoLivro;
}

export const obterLivroPorIdOuTitulo = async (req, res) => {
    try {
        const { id } = req.params;
        const termoBusca = decodeURIComponent(id).trim();

        let livroLocal = null;
        if (!isNaN(parseInt(termoBusca))) {
            livroLocal = await prisma.livro.findUnique({
                where: { id: parseInt(termoBusca) }
            });
        }

        if (!livroLocal) {
            livroLocal = await prisma.livro.findFirst({
                where: { titulo: { contains: termoBusca } }
            });
        }

        if (livroLocal) {
            return res.status(200).json(preencherMetadadosFaltantes(livroLocal));
        }

        const chamadas = ENDPOINTS_CONFIG.map(endpoint => fazerRequisicaoExterna(endpoint));
        const resultados = await Promise.all(chamadas);

        for (let i = 0; i < resultados.length; i++) {
            const raw = resultados[i];
            if (!raw) continue;

            const lista = Array.isArray(raw) ? raw : [raw];
            const livroEncontrado = lista.find(item => {
                const itemTitulo = item.titulo || item.title || item.tituloDoLivro || '';
                return normalize(itemTitulo) === normalize(termoBusca);
            });

            if (livroEncontrado) {
                const mapeado = mapExternalToInternal(livroEncontrado);
                return res.status(200).json(mapeado);
            }
        }

        return res.status(404).json({ erro: 'Obra não localizada nos catálogos locais ou parceiros.' });

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const obterBibliotecaCompleta = async (req, res) => {
    try {
        const promessas = ENDPOINTS_CONFIG.map(async (livro) => {
            try {
                if (!livro.urlCompleta || !livro.apiKey) {
                    return { livro: livro.nomeLivro, statusApi: 'Configuração Ausente', conteudo: [] };
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
                    return { livro: livro.nomeLivro, statusApi: `Erro HTTP ${resposta.status}`, conteudo: [] };
                }

                const dadosBrutos = await resposta.json();
                const listaDeLivros = Array.isArray(dadosBrutos) ? dadosBrutos : dadosBrutos ? [dadosBrutos] : [];

                const dadosFormatados = listaDeLivros.map((item) => {
                    const mapped = mapExternalToInternal(item);
                    if (mapped.titulo?.toLowerCase().includes('nao informado') && mapped.autor?.toLowerCase().includes('memorias postumas')) {
                        mapped.titulo = "Memórias Póstumas de Brás Cubas";
                        mapped.autor = "Machado de Assis";
                    }
                    return preencherMetadadosFaltantes(mapped);
                });

                return { livro: livro.nomeLivro, statusApi: 'Online', conteudo: dadosFormatados };

            } catch {
                return { livro: livro.nomeLivro, statusApi: 'Erro Interno na Requisição', conteudo: [] };
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
        const chamadas = ENDPOINTS_CONFIG.map(endpoint => fazerRequisicaoExterna(endpoint).catch(() => []));
        const resultados = await Promise.all(chamadas);

        const mappedLists = ENDPOINTS_CONFIG.flatMap((endpoint, index) => {
            const raw = resultados[index];
            if (!raw) return [];

            const lista = Array.isArray(raw) ? raw : [raw];
            return lista.map((item) => {
                const normalizado = mapExternalToInternal(item);

                if ((!normalizado.titulo || normalizado.titulo.toLowerCase().includes('nao informado')) && (normalizado.autor && normalizado.autor.toLowerCase().includes('memorias postumas'))) {
                    normalizado.titulo = "Memórias Póstumas de Brás Cubas";
                    normalizado.autor = "Machado de Assis";
                }

                return { ...preencherMetadadosFaltantes(normalizado), fonte: endpoint.nomeLivro };
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
                const idx = deduped.findIndex(d => normalize(d.titulo) === chave);
                if (idx !== -1) {
                    if (!deduped[idx].capa_url && item.capa_url) deduped[idx].capa_url = item.capa_url;
                    if ((!deduped[idx].sinopse || deduped[idx].sinopse.includes('não informado')) && item.sinopse) deduped[idx].sinopse = item.sinopse;
                    if (!deduped[idx].contexto_historico_pt && item.contexto_historico_pt) deduped[idx].contexto_historico_pt = item.contexto_historico_pt;
                    if (!deduped[idx].simbolismo_pt && item.simbolismo_pt) deduped[idx].simbolismo_pt = item.simbolismo_pt;
                }
            }
        }

        return res.status(200).json({ data: deduped, meta: { total: deduped.length } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const importarTodosOsLivros = async (req, res) => {
    try {
        const { usuarioId } = req.body || {};
        const chamadas = ENDPOINTS_CONFIG.map(endpoint => fazerRequisicaoExterna(endpoint).catch(() => []));
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
            } catch {
                ignorados.push(tituloDefinitivo || null);
            }
        }

        return res.status(201).json({
            message: 'Importação concluída',
            data: importados,
            meta: { totalEncontrados: todosOsLivros.length, totalImportados: importados.length, totalIgnorados: ignorados.filter(Boolean).length }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};