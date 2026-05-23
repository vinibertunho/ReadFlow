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
        sinopse: external.sinopse || external.description || external.resumo || external.enredo_pt || external.synopsis || null,
        genero_pt: external.genero_pt || external.genero || external.generoPT || external.genrePt || 'Geral',
        genero_en: external.genero_en || external.genre || external.generoEN || external.genreEn || 'General',
        contexto_pt: external.contexto_pt || external.contextPt || external.historicalContextPt || null,
        contexto_en: external.contexto_en || external.contextEn || external.historicalContextEn || null,
        descricao_pt: external.descricao_pt || external.descriptionPt || null,
        descricao_en: external.descricao_en || external.descriptionEn || null,
        capa_url: external.capa_url || external.capa || external.image || external.capaURL || external.foto || null,
        video_url: external.video_url || external.videoUrl || null,
        usuarioId: null,
    };
}

async function salvarLivroNoBanco(dadosLivroExterno, usuarioId = null) {
    const novoLivro = await prisma.livro.create({
        data: {
            titulo: dadosLivroExterno.titulo || dadosLivroExterno.title || dadosLivroExterno.tituloDoLivro || 'Título Desconhecido',
            autor: dadosLivroExterno.autor || dadosLivroExterno.author || dadosLivroExterno.autores || 'Autor Desconhecido',
            anoPublicacao: dadosLivroExterno.dadosLivroExterno || dadosLivroExterno.ano || dadosLivroExterno.year || null,
            sinopse: dadosLivroExterno.sinopse || dadosLivroExterno.description || dadosLivroExterno.resumo || dadosLivroExterno.enredo_pt || null,
            genero_pt: dadosLivroExterno.genero_pt || dadosLivroExterno.genero || 'Geral',
            genero_en: dadosLivroExterno.genero_en || dadosLivroExterno.genre || 'General',
            capa_url: dadosLivroExterno.capa_url || dadosLivroExterno.capa || dadosLivroExterno.image || null,
            video_url: dadosLivroExterno.video_url || dadosLivroExterno.videoUrl || null,
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
        console.log(`Total de livros cadastrados no array: ${ENDPOINTS_CONFIG.length}`);

        const promessas = ENDPOINTS_CONFIG.map(async (livro, index) => {
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
                    let titulo = item.titulo || item.title || item.tituloDoLivro || item.tituloPT || 'Título não informado';
                    let autor = item.autor || item.author || item.autores || item.nome || 'Autor não informado';

                    if (titulo.toLowerCase().includes('nao informado') && autor.toLowerCase().includes('memorias postumas')) {
                        titulo = "Memórias Póstumas de Brás Cubas";
                        autor = "Machado de Assis";
                    }

                    return {
                        titulo,
                        autor,
                        capa_url: item.capa || item.image || item.capaURL || item.capa_url || item.foto || null,
                        ano: item.ano || item.year || item.anoPublicacao || item.publicacao || 'N/A',
                        genero_pt: item.genero_pt || item.genero || item.generoPT || 'Gênero não informado',
                        genero_en: item.genero_en || item.genre || item.generoEN || 'Genre not informed',
                        enredo_pt: item.enredo_pt || item.resumo || item.sinopse || 'Enredo não informado',
                        enredo_en: item.enredo_en || item.description || item.resumoEn || 'Description not informed',
                    };
                });

                return {
                    livro: livro.nomeLivro,
                    statusApi: 'Online',
                    conteudo: dadosFormatados,
                };

            } catch (erroLivro) {
                console.error(`🚨 [Erro no mapa do livro ${livro.nomeLivro}]:`, erroLivro.message);
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
        console.error('💥 ERRO CRÍTICO NO CATCH PRINCIPAL:', error.message);
        return res.status(500).json({ erro: 'Erro crítico no servidor.', detalhe: error.message });
    }
};

export const listarIntegracao = async (req, res) => {
    try {
        const chamadas = ENDPOINTS_CONFIG.map(endpoint => 
            fazerRequisicaoExterna(endpoint).catch(error => {
                console.warn(`${endpoint.nomeLivro} falhou:`, error && error.message);
                return [];
            })
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
        console.error('Erro ao listar integração:', error);
        return res.status(500).json({ error: 'Erro ao reunir os livros em uma única integração.' });
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
                console.error('Erro ao salvar livro em lote:', err.message || err);
                ignorados.push(tituloDefinitivo || null);
            }
        }

        return res.status(201).json({
            message: 'Importação em lote de todas as APIs parceiras concluída com sucesso!',
            data: importados,
            meta: {
                totalEncontrados: todosOsLivros.length,
                totalImportados: importados.length,
                totalIgnorados: ignorados.filter(Boolean).length,
            },
        });
    } catch (error) {
        console.error('Erro geral ao importar livros:', error);
        return res.status(500).json({ error: 'Erro ao processar a importação em lote.' });
    }
};