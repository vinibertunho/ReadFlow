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
        descricao_en: "A classic of Brazilian Romanticism that explores the formation of national identity through the myth of the noble savage.",
        personagens_pt: "Peri (O Guarani)\nCecília (Ceci)\nDom Antônio de Mariz\nDona Lauriana\nÁlvaro\nLoredano",
        personagens_en: "Peri (The Guarani)\nCecilia (Ceci)\nDom António de Mariz\nDona Lauriana\nÁlvaro\nLoredano",
        contexto_historico_pt: "Romantismo brasileiro (século XIX), focado na idealização do índio como o herói nacional e a colonização do Brasil.",
        contexto_historico_en: "Brazilian Romanticism (19th century), focused on the idealization of the indigenous people as the national hero and the colonization of Brazil.",
        detalhes_autor_pt: "José de Alencar (1829-1877) foi um dos maiores romancistas brasileiros, pioneiro na literature romantista. Dedicou-se a preservar a identidade cultural brasileira.",
        detalhes_autor_en: "José de Alencar (1829-1877) was one of the greatest Brazilian novelists, a pioneer in Romantic literature. He dedicated himself to preserving Brazilian cultural identity.",
        estilo_escrita_pt: "Prosa poética, idealizadora, rica em descrições da exuberante natureza tropical brasileira. Uso de linguagem elevada e sentimentalismo acentuado.",
        estilo_escrita_en: "Poetic prose, idealizing, rich in descriptions of the exuberant tropical Brazilian nature. Use of elevated language and pronounced sentimentalism.",
        verossimilhanca_pt: "Combina o romance idealizado com elements realistas da colonização portuguesa, criando uma narrativa que mistura história e ficção.",
        verossimilhanca_en: "Combines idealized romance with realistic elements of Portuguese colonization, creating a narrative that blends history and fiction.",
        caracteristicas_literarias_pt: "Nacionalismo, idealismo, exotismo, amor impossível, conflito entre colonizadores e colonizados, transcendência da natureza.",
        caracteristicas_literarias_en: "Nationalism, idealism, exoticism, impossible love, conflict between colonizers and colonized, transcendence of nature.",
        conclusao_pt: "A obra consolida a identidade literária brasileira, criando um herói nacional genuinamente brasileiro e questionando a hierarquia racial colonial.",
        conclusao_en: "The work consolidates Brazilian literary identity, creating a genuinely Brazilian national hero and questioning colonial racial hierarchy.",
        simbolismo_pt: "Peri representa o índio idealizado; a floresta simboliza a liberdade e pureza; Ceci personifica a inocência europeia no novo mundo.",
        simbolismo_en: "Peri represents the idealized indigenous; the forest symbolizes freedom and purity; Ceci personifies European innocence in the new world.",
        engajamento_pt: "Obra fortemente engajada com a formação da nação brasileira, promovendo a valorização da cultura indígena dentro da narrativa romântica.",
        engajamento_en: "Deeply engaged with the formation of the Brazilian nation, promoting the valorization of indigenous culture within the romantic narrative.",
        temas_chave_pt: "Amor, Patriotismo, Natureza, Colonialismo, Identidade Nacional, Sacrifício, Honra, Superação de Barreiras Sociais",
        temas_chave_en: "Love, Patriotism, Nature, Colonialism, National Identity, Sacrifice, Honor, Overcoming Social Barriers"
    },
    "quartos de despejo": {
        sinopse: "O diário real de Carolina Maria de Jesus relata a dura rotina de uma catadora de papel na favela do Canindé, em São Paulo, lutando diariamente contra a fome e a miséria para sustentar seus filhos.",
        capa_url: "https://m.media-amazon.com/images/I/71Z3+oFrHnL._AC_UF1000,1000_QL80_.jpg",
        foto: "https://m.media-amazon.com/images/I/71Z3+oFrHnL._AC_UF1000,1000_QL80_.jpg",
        descricao_pt: "Obra visceral e autobiográfica da literatura periférica e documental brasileira.",
        descricao_en: "A visceral and autobiographical work of peripheral and documentary Brazilian literature.",
        personagens_pt: "Carolina Maria de Jesus\nJoão José\nJosé Carlos\nVera Eunice\nOs moradores da favela do Canindé",
        personagens_en: "Carolina Maria of Jesus\nJoão José\nJosé Carlos\nVera Eunice\nThe residents of Canindé favela",
        contexto_historico_pt: "Brasil do final dos anos 1950, marcado pela urbanização acelerada, desigualdade social latente e o surgimento das grandes favelas.",
        contexto_historico_en: "Brazil of the late 1950s, marked by rapid urbanization, latent social inequality and the emergence of large favelas.",
        detalhes_autor_pt: "Carolina Maria de Jesus (1914-1977) foi uma escritora afro-brasileira, mãe de três filhos, que vivia em extrema pobreza. Seu diário se tornou símbolo da luta contra a desigualdade.",
        detalhes_autor_en: "Carolina Maria of Jesus (1914-1977) was an Afro-Brazilian writer, mother of three children, who lived in extreme poverty. Her diary became a symbol of the struggle against inequality.",
        estilo_escrita_pt: "Linguagem crua, direta, em formato de diário, com desvios da norma culta que trazem realismo e impacto poético. Prosa visceral e autêntica.",
        estilo_escrita_en: "Raw, direct language, in diary format, with deviations from standard speech that bring realism and poetic impact. Visceral and authentic prose.",
        verossimilhanca_pt: "Máxima verossimilhança - é um diário verdadeiro, documentação real da vida na favela, sem ficção ou embellishment.",
        verossimilhanca_en: "Maximum verisimilitude - it is a true diary, real documentation of life in the favela, without fiction or embellishment.",
        caracteristicas_literarias_pt: "Realismo de primeira mão, testemunho social, crítica social implícita, lirismo na adversidade, resistência espiritual.",
        caracteristicas_literarias_en: "First-hand realism, social testimony, implicit social criticism, lyricism in adversity, spiritual resistance.",
        conclusao_pt: "A obra denota a força da voz periférica e a necessidade de humanização dos marginalizados sociais, questionando a estrutura de desigualdade.",
        conclusao_en: "The work denotes the strength of the peripheral voice and the need for humanization of the socially marginalized, questioning the structure of inequality.",
        simbolismo_pt: "O diário simboliza a voz silenciada; a favela representa a injustiça sistêmica; a escrita como ato de resistência e sobrevivência.",
        simbolismo_en: "The diary symbolizes the silenced voice; the favela represents systemic injustice; writing as an act of resistance and survival.",
        engajamento_pt: "Obra fundamentalmente engajada na denúncia das condições de pobreza extrema e na reivindicação de dignidade humana para os marginalizados.",
        engajamento_en: "Work fundamentally engaged in denouncing extreme poverty conditions and claiming human dignity for the marginalized.",
        temas_chave_pt: "Pobreza, Fome, Maternidade, Resistência, Dignidade Humana, Desigualdade Social, Violência Estrutural, Esperança na Adversidade",
        temas_chave_en: "Poverty, Hunger, Motherhood, Resistance, Human Dignity, Social Inequality, Structural Violence, Hope in Adversity"
    },
    "memorias postumas de bras cubas": {
        sinopse: "Narrado por um 'defunto autor', Brás Cubas relata suas memórias fúteis de forma irônica, expondo as hipocrisias, falhas morais e privilégios da elite aristocrática de sua época.",
        descricao_pt: "A obra-prima que inaugurou o Realismo no Brasil, célebre pela sua estrutura fragmentada e narrador não confiável.",
        descricao_en: "The masterpiece that inaugurated Realism in Brazil, famous for its fragmented structure and unreliable narrator.",
        personagens_pt: "Brás Cubas\nVirgília\nMarcela\nQuincas Borba\nLobo Neves\nSabina\nPrudêncio",
        personagens_en: "Brás Cubas\nVirgília\nMarcela\nQuincas Borba\nLobo Neves\nSabina\nPrudêncio",
        contexto_historico_pt: "Segundo Reinado no Brasil (século XIX), sociedade escravocrata, patriarcal e governada por uma elite oligárquica fútil.",
        contexto_historico_en: "Second Reign in Brazil (19th century), slaveholding, patriarchal society governed by a futile oligarchic elite.",
        detalhes_autor_pt: "Machado de Assis (1839-1908) foi o maior romancista brasileiro, fundador da Academia Brasileira de Letras. Superou preconceitos raciais para tornar-se clássico universal.",
        detalhes_autor_en: "Machado of Assis (1839-1908) was the greatest Brazilian novelist, founder of the Brazilian Academy of Letters. He overcame racial prejudices to become a universal classic.",
        estilo_escrita_pt: "Pessimismo irônico, digressões filosóficas frequentes, metalinguagem e deboche refinado. Narrativa fragmentada com prefácio subversivo.",
        estilo_escrita_en: "Ironic pessimism, frequent philosophical digressions, metalanguage and refined mockery. Fragmented narrative with subversive preface.",
        verossimilhanca_pt: "Alta verossimilhança psicológica - análise profunda da hipocrisia humana e das motivações egoístas disfarçadas de virtude.",
        verossimilhanca_en: "High psychological verisimilitude - deep analysis of human hypocrisy and selfish motivations disguised as virtue.",
        caracteristicas_literarias_pt: "Ironia sistemática, diálogo com tradição literária, crítica social oblíqua, análise psicológica, narrative não linear.",
        caracteristicas_literarias_en: "Systematic irony, dialogue with literary tradition, oblique social criticism, psychological analysis, non-linear narrative.",
        conclusao_pt: "Obra que revoluciona o romance brasileiro ao questionar a própria narrativa, a moralidade burguesa e a futilidade da existência humana.",
        conclusao_en: "Work that revolutionizes the Brazilian novel by questioning the narrative itself, bourgeois morality and the futility of human existence.",
        simbolismo_pt: "Brás Cubas morto representa a morte da ilusão; os capítulos são fragmentos de memória; a escada simboliza a ascensão social vã.",
        simbolismo_en: "Dead Brás Cubas represents the death of illusion; the chapters are fragments of memory; the stairs symbolize vain social ascension.",
        engajamento_pt: "Crítica profunda das estruturas sociais, escravidão, hipocrisia moral da elite, perpetuação de privilégios através de sistemas injustos.",
        engajamento_en: "Profound criticism of social structures, slavery, moral hypocrisy of the elite, perpetuation of privileges through unjust systems.",
        temas_chave_pt: "Morte, Memória, Hipocrisia, Futilidade, Amor Impossível, Ambição, Escravidão, Crítica Social, Ironia da Vida",
        temas_chave_en: "Death, Memory, Hypocrisy, Futility, Impossible Love, Ambition, Slavery, Social Criticism, Life's Irony"
    },
    "bookverse": {
        sinopse: "Uma coletânea integrada trazendo obras clássicas e contemporâneas do cenário literário brasileiro.",
        descricao_pt: "Universo literário expandido que conecta múltiplos autores e obras no ecossistema do Bookverse.",
        descricao_en: "Expanded literary universe that connects multiple authors and works in the Bookverse ecosystem.",
        personagens_pt: "Capitu\nBentinho\nEscobar\nIacema\nLeonardo",
        personagens_en: "Capitu\nBentinho\nEscobar\nIacema\nLeonardo",
        contexto_historico_pt: "Compilado de literatura geral e clássicos integrados de forma unificada, abrangendo múltiplos períodos literários brasileiros.",
        contexto_historico_en: "Compilation of general literature and integrated classics in a unified way, encompassing multiple Brazilian literary periods.",
        detalhes_autor_pt: "Bookverse é uma plataforma que reúne obras de diversos autores clássicos brasileiros, criando um universo literário interconectado e expansível.",
        detalhes_autor_en: "Bookverse is a platform that brings together works by various classic Brazilian authors, creating an interconnected and expandable literary universe.",
        estilo_escrita_pt: "Abordagem dinâmica e diversificada com foco na experiência multiplataforma. Integra vários estilos de escrita em um único universo.",
        estilo_escrita_en: "Dynamic and diversified approach with focus on multiplatform experience. Integrates various writing styles into a single universe.",
        verossimilhanca_pt: "Verossimilhança na integração de obras distintas que compartilham temáticas brasileiras e período histórico comum.",
        verossimilhanca_en: "Verisimilitude in the integration of distinct works that share Brazilian themes and common historical period.",
        caracteristicas_literarias_pt: "Intertextualidade, romance literário, narrativa envolvente, diversidade de gêneros, profundidade psicológica dos personagens.",
        caracteristicas_literarias_en: "Intertextuality, literary romance, engaging narrative, diversity of genres, psychological depth of characters.",
        conclusao_pt: "Bookverse consolida a riqueza da literatura brasileira clássica, permitindo novas conexões e leituras contemporâneas de obras atemporais.",
        conclusao_en: "Bookverse consolidates the richness of classic Brazilian literature, allowing new connections and contemporary readings of timeless works.",
        simbolismo_pt: "O universo Bookverse simboliza a continuidade da tradição literária, a interconexão de destinos e a eternidade das grandes obras.",
        simbolismo_en: "The Bookverse universe symbolizes the continuity of literary tradition, the interconnection of destinies and the eternity of great works.",
        engajamento_pt: "Engajado na promoção e preservação da literatura brasileira clássica, criando novas audiências e interpretações para gerações futuras.",
        engajamento_en: "Engaged in promoting and preserving classic Brazilian literature, creating new audiences and interpretations for future generations.",
        temas_chave_pt: "Literature, Identidade Nacional, Conexão entre Obras, Tradição e Inovação, Amor, Aventura, Busca Pessoal, Legado Cultural",
        temas_chave_en: "Literature, National Identity, Connection between Works, Tradition and Innovation, Love, Adventure, Personal Quest, Cultural Legacy"
    },
    "vidas secas": {
        sinopse: "Temas de Redação: 1° Desigualdade Social 2° Falta de acesso à Educação e Direitos 3° Exclusão Social 4° Exploração do Trabalhador 5° Seca e Problemas Climáticos",
        capa_url: "https://m.media-amazon.com/images/I/71h5JfmCJ1L._AC_UF1000,1000_QL80_.jpg",
        foto: "https://m.media-amazon.com/images/I/71h5JfmCJ1L._AC_UF1000,1000_QL80_.jpg",
        descricao_pt: "A obra Vidas Secas, de Graciliano Ramos, retrata a vida difícil de uma família de retirantes nordestinos que sofre com a seca, a fome e a pobreza.",
        descricao_en: "The novel Vidas Secas (Barren Lives), by Graciliano Ramos, portrays the difficult life of a family of migrants from the Brazilian Northeast.",
        personagens_pt: "Fabiano (pai retirante)\nSinhá Vitória (mãe)\nFilho mais velho (sem nome)\nFilho mais novo (sem nome)\nBaleia (cachorra)",
        personagens_en: "Fabiano (migrant father)\nSinhá Vitória (mother)\nOlder son (unnamed)\nYounger son (unnamed)\nBaleia (dog)",
        contexto_historico_pt: "Obra ambientada na seca do Nordeste brasileiro, retratando a realidade dos retirantes do início do século XX.",
        contexto_historico_en: "Set during the Brazilian Northeast drought, portraying the reality of migrants from the early 20th century.",
        detalhes_autor_pt: "Graciliano Ramos (1892-1953) foi um dos maiores romancistas brasileiros, mestre da prosa seca e direta.",
        detalhes_autor_en: "Graciliano Ramos (1892-1953) was one of the greatest Brazilian novelists, master of spare and direct prose.",
        estilo_escrita_pt: "Espírito de síntese, descrição não minuciosa do espaço, foco na tragédia social e desumanização.",
        estilo_escrita_en: "Spirit of synthesis, non-detailed space description, focus on social tragedy and dehumanization.",
        verossimilhanca_pt: "Máxima verossimilhança - baseado em observações reais das condições de vida dos retirantes nordestinos.",
        verossimilhanca_en: "Maximum verisimilitude - based on real observations of the living conditions of Northeast migrants.",
        caracteristicas_literarias_pt: "Mudez introspectiva, episódios independentes sem ligação cronológica rígida.",
        caracteristicas_literarias_en: "Introspective muteness, semi-independent chapters without rigid chronological connection.",
        conclusao_pt: "Vidas Secas é um grito de protesto contra a desigualdade estrutural e a negligência estatal.",
        conclusao_en: "Vidas Secas is a cry of protest against structural inequality and state neglect.",
        simbolismo_pt: "A seca simboliza a opressão sistemática; os filhos sem nome representam a desumanização; Baleia encarna a inocência.",
        simbolismo_en: "The drought symbolizes systematic oppression; the unnamed children represent dehumanization; Baleia embodies innocence.",
        engajamento_pt: "Obra profundamente engajada na denúncia das desigualdades sociais.",
        engajamento_en: "Work deeply engaged in denouncing social inequalities.",
        temas_chave_pt: "Desigualdade Social, Fome, Seca, Migração Forçada, Desumanização, Falta de Direitos",
        temas_chave_en: "Social Inequality, Hunger, Drought, Forced Migration, Dehumanization, Lack of Rights"
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

function extrairPersonagensLista(valor) {
    if (!valor) return [];

    if (Array.isArray(valor)) {
        return valor
            .map(item => {
                if (!item) return null;
                if (typeof item === 'string') {
                    const nome = item.trim();
                    return nome ? { nome, descricao: null } : null;
                }

                const nome = (item.nome || item.name || item.titulo || item.title || '').toString().trim();
                if (!nome) return null;

                return {
                    nome,
                    descricao: item.descricao || item.description || null,
                };
            })
            .filter(Boolean);
    }

    if (typeof valor === 'string') {
        return valor
            .split(/\r?\n|;/)
            .map(nome => nome.trim())
            .filter(Boolean)
            .map(nome => ({ nome, descricao: null }));
    }

    return [];
}

function incluirPersonagensNoLivro(livro) {
    if (!livro || typeof livro !== 'object') return livro;

    const personagens = [
        ...extrairPersonagensLista(livro.personagens),
        ...extrairPersonagensLista(livro.personagens_pt),
        ...extrairPersonagensLista(livro.personagens_en),
    ];

    const vistos = new Set();
    const personagensUnicos = personagens.filter(personagem => {
        const chave = normalize(personagem.nome || '');
        if (!chave || vistos.has(chave)) return false;
        vistos.add(chave);
        return true;
    });

    return {
        ...livro,
        personagens: personagensUnicos,
    };
}

function preencherMetadadosFaltantes(mapped) {
    let chave = normalize(mapped.titulo || '');
    let metadado = METADADOS_LIVROS[chave];

    if (!metadado && mapped.titulo) {
        const tituloNorm = normalize(mapped.titulo);
        for (const [key, value] of Object.entries(METADADOS_LIVROS)) {
            if (tituloNorm.includes(key) || key.includes(tituloNorm)) {
                metadado = value;
                break;
            }
        }
    }

    if (metadado) {
        Object.keys(metadado).forEach(campo => {
            mapped[campo] = mapped[campo] || metadado[campo];
        });
    }
    return mapped;
}

async function fazerRequisicaoExterna(endpoint) {
    if (!endpoint.urlCompleta) return null;
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
        return await response.json();
    } catch {
        return null;
    }
}

function mapExternalToInternal(external = {}) {
    function extrairNomesPersonagens(arr) {
        if (!Array.isArray(arr)) return arr;
        if (arr.length > 0 && typeof arr[0] === 'object' && arr[0] !== null) {
            return arr.map(p => p.nome || p.name || p.titulo || p.title || JSON.stringify(p)).join('\n');
        }
        return arr.join('\n');
    }

    let titulo = external.titulo || external.title || external.tituloDoLivro || external.tituloPT || external.nome || null;
    let autor = external.autor || external.author || external.autores || null;

    if (!titulo && autor) {
        const autorLower = autor.toLowerCase();
        if (autorLower.includes('memórias') || autorLower.includes('guarani') || 
            autorLower.includes('quartos') || autorLower.includes('vidas') || 
            autorLower.includes('bookverse')) {
            titulo = autor;
            autor = null;
        }
    }

    if (!autor && titulo) {
        const tituloLower = titulo.toLowerCase();
        if (tituloLower.includes('memórias')) {
            autor = "Machado de Assis";
        } else if (tituloLower.includes('guarani')) {
            autor = "José de Alencar";
        } else if (tituloLower.includes('quartos')) {
            autor = "Carolina Maria de Jesus";
        } else if (tituloLower.includes('vidas')) {
            autor = "Graciliano Ramos";
        }
    }
    
    let mapped = {
        titulo: titulo,
        autor: autor,
        anoPublicacao: external.anoPublicacao ? parseInt(external.anoPublicacao) : external.ano ? parseInt(external.ano) : external.year ? parseInt(external.year) : null,
        paginas: external.paginas ? parseInt(external.paginas) : external.pages ? parseInt(external.pages) : null,
        capa_url: external.capa_url || external.foto || external.capa || external.image || external.capaURL || null,
        foto: external.foto || external.capa_url || external.capa || external.image || external.capaURL || null,
        video_url: external.video_url || external.videoUrl || null,
        genero_pt: external.genero_pt || external.genero || null,
        genero_en: external.genero_en || external.genre || null,
        sinopse: external.sinopse || external.description || external.resumo || null,
        descricao_pt: external.descricao_pt || null,
        descricao_en: external.descricao_en || null,
        personagens_pt: external.personagens_pt || external.personagens || extrairNomesPersonagens(external.personagensArray) || null,
        personagens_en: external.personagens_en || extrairNomesPersonagens(external.personagensEn) || null,
        contexto_historico_pt: external.contexto_historico_pt || external.contexto_pt || null,
        contexto_historico_en: external.contexto_historico_en || external.contexto_en || null,
        detalhes_autor_pt: external.detalhes_autor_pt || null,
        detalhes_autor_en: external.detalhes_autor_en || null,
        estilo_escrita_pt: external.estilo_escrita_pt || null,
        estilo_escrita_en: external.estilo_escrita_en || null,
        verossimilhanca_pt: external.verossimilhanca_pt || null,
        verossimilhanca_en: external.verossimilhanca_en || null,
        caracteristicas_literarias_pt: external.caracteristicas_literarias_pt || null,
        caracteristicas_literarias_en: external.caracteristicas_literarias_en || null,
        conclusao_pt: external.conclusao_pt || null,
        conclusao_en: external.conclusao_en || null,
        simbolismo_pt: external.simbolismo_pt || null,
        simbolismo_en: external.simbolismo_en || null,
        engajamento_pt: external.engajamento_pt || null,
        engajamento_en: external.engajamento_en || null,
        temas_chave_pt: external.temas_chave_pt || null,
        temas_chave_en: external.temas_chave_en || null,
        usuarioId: null
    };

    return preencherMetadadosFaltantes(mapped);
}

// ====== EXPORTS DAS ROTAS ======

export const obterLivroPorIdOuTitulo = async (req, res) => {
    try {
        const { id } = req.params;
        const termoBusca = decodeURIComponent(id).trim();

        let livroLocal = null;
        if (!isNaN(parseInt(termoBusca))) {
            livroLocal = await prisma.livro.findUnique({
                where: { id: parseInt(termoBusca) },
                include: { personagens: true },
            });
        }

        if (!livroLocal) {
            livroLocal = await prisma.livro.findFirst({
                where: { titulo: { contains: termoBusca } },
                include: { personagens: true },
            });
        }

        if (livroLocal) {
            const livroComMetadados = preencherMetadadosFaltantes(livroLocal);
            return res.status(200).json(incluirPersonagensNoLivro(livroComMetadados));
        }

        const chamadas = ENDPOINTS_CONFIG.map(endpoint => fazerRequisicaoExterna(endpoint));
        const resultados = await Promise.all(chamadas);

        for (let i = 0; i < resultados.length; i++) {
            const raw = resultados[i];
            if (!raw) continue;

            const lista = Array.isArray(raw) ? raw : [raw];
            const livroEncontrado = lista.find(item => {
                let itemTitulo = item.titulo || item.title || item.tituloDoLivro || item.nome || '';
                if (!itemTitulo && item.autor && item.autor.toLowerCase().includes('memórias')) {
                    itemTitulo = item.autor;
                }
                return normalize(itemTitulo) === normalize(termoBusca);
            });

            if (livroEncontrado) {
                const mapeado = mapExternalToInternal(livroEncontrado);
                return res.status(200).json(incluirPersonagensNoLivro(mapeado));
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
                if (!livro.urlCompleta) {
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
                    return { livro: livro.nomeLivro, statusApi: `Erro ${resposta.status}`, conteudo: [] };
                }

                const dados = await resposta.json();
                const lista = Array.isArray(dados) ? dados : [dados];
                const mapeados = lista
                    .map(item => mapExternalToInternal(item))
                    .map(item => incluirPersonagensNoLivro(item));

                return { livro: livro.nomeLivro, statusApi: 'Online', conteudo: mapeados };
            } catch {
                return { livro: livro.nomeLivro, statusApi: 'Falha de Conexão', conteudo: [] };
            }
        });

        const resultados = await Promise.all(promessas);
        return res.status(200).json(resultados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const listarIntegracao = async (req, res) => {
    try {
        const promessas = ENDPOINTS_CONFIG.map(endpoint => fazerRequisicaoExterna(endpoint));
        const resultados = await Promise.all(promessas);

        const livros = new Map();
        
        resultados.forEach(raw => {
            if (!raw) return;
            const lista = Array.isArray(raw) ? raw : [raw];
            lista.forEach(item => {
                const mapeado = mapExternalToInternal(item);
                const chave = normalize(mapeado.titulo || '');
                if (chave && !livros.has(chave)) {
                    livros.set(chave, incluirPersonagensNoLivro(mapeado));
                }
            });
        });

        const livrosUnificados = Array.from(livros.values());
        return res.status(200).json(livrosUnificados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const importarTodosOsLivros = async (req, res) => {
    try {
        const promessas = ENDPOINTS_CONFIG.map(endpoint => fazerRequisicaoExterna(endpoint));
        const resultados = await Promise.all(promessas);

        const livrosParaImportar = [];
        const livrosTitulos = new Set();

        resultados.forEach(raw => {
            if (!raw) return;
            const lista = Array.isArray(raw) ? raw : [raw];
            lista.forEach(item => {
                const mapeado = mapExternalToInternal(item);
                const titulo = normalize(mapeado.titulo || '');
                if (titulo && !livrosTitulos.has(titulo)) {
                    livrosTitulos.add(titulo);
                    livrosParaImportar.push(mapeado);
                }
            });
        });

        const livrosCriados = await Promise.all(
            livrosParaImportar.map(livro =>
                prisma.livro.upsert({
                    where: { titulo: livro.titulo },
                    update: livro,
                    create: livro,
                })
            )
        );

        return res.status(201).json({
            mensagem: `${livrosCriados.length} livro(s) importado(s) com sucesso`,
            livros: livrosCriados,
        });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const obterGuarani = async (req, res) => {
    try {
        const endpoint = ENDPOINTS_CONFIG.find(e => e.nomeLivro === 'O Guarani');
        if (!endpoint) return res.status(404).json({ erro: 'Configuração de O Guarani não encontrada' });

        const dados = await fazerRequisicaoExterna(endpoint);
        if (!dados) return res.status(404).json({ erro: 'Não foi possível obter dados de O Guarani' });

        const lista = Array.isArray(dados) ? dados : [dados];
        const mapeados = lista
            .map(item => mapExternalToInternal(item))
            .map(item => incluirPersonagensNoLivro(item));
        return res.status(200).json(mapeados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const obterQuartosDespejo = async (req, res) => {
    try {
        const endpoint = ENDPOINTS_CONFIG.find(e => e.nomeLivro === 'Quartos de despejo');
        if (!endpoint) return res.status(404).json({ erro: 'Configuração de Quartos de Despejo não encontrada' });

        const dados = await fazerRequisicaoExterna(endpoint);
        if (!dados) return res.status(404).json({ erro: 'Não foi possível obter dados de Quartos de Despejo' });

        const lista = Array.isArray(dados) ? dados : [dados];
        const mapeados = lista
            .map(item => mapExternalToInternal(item))
            .map(item => incluirPersonagensNoLivro(item));
        return res.status(200).json(mapeados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const obterMemoriasCubas = async (req, res) => {
    try {
        const endpoint = ENDPOINTS_CONFIG.find(e => e.nomeLivro === 'Memórias Póstumas de Brás Cubas');
        if (!endpoint) return res.status(404).json({ erro: 'Configuração de Memórias Póstumas de Brás Cubas não encontrada' });

        const dados = await fazerRequisicaoExterna(endpoint);
        if (!dados) return res.status(404).json({ erro: 'Não foi possível obter dados de Memórias Póstumas de Brás Cubas' });

        const lista = Array.isArray(dados) ? dados : [dados];
        const mapeados = lista
            .map(item => mapExternalToInternal(item))
            .map(item => incluirPersonagensNoLivro(item));
        return res.status(200).json(mapeados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const obterBookverse = async (req, res) => {
    try {
        const endpoint = ENDPOINTS_CONFIG.find(e => e.nomeLivro === 'Bookverse');
        if (!endpoint) return res.status(404).json({ erro: 'Configuração de Bookverse não encontrada' });

        const dados = await fazerRequisicaoExterna(endpoint);
        if (!dados) return res.status(404).json({ erro: 'Não foi possível obter dados de Bookverse' });

        const lista = Array.isArray(dados) ? dados : [dados];
        const mapeados = lista
            .map(item => mapExternalToInternal(item))
            .map(item => incluirPersonagensNoLivro(item));
        return res.status(200).json(mapeados);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

export const obterVidasSecas = async (req, res) => {
    try {
        const metadado = METADADOS_LIVROS["vidas secas"];

        const dadosSimulados = {
            titulo: "Vidas Secas",
            autor: "Graciliano Ramos",
            anoPublicacao: 1938,
            paginas: 176,
            genero_pt: "Romance",
            genero_en: "Novel",
            ...metadado,
        };

        const mapeado = incluirPersonagensNoLivro(mapExternalToInternal(dadosSimulados));
        return res.status(200).json([mapeado]);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};