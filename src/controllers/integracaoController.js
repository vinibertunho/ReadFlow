import prisma from "../lib/services/prismaClient.js";

const ENDPOINTS_CONFIG = [
  {
    nomeLivro: "O Guarani",
    urlCompleta: "https://bookpedia-backend-4ab3.onrender.com/livros",
    apiKey: process.env.KEY_LIVRO_O_GUARANI || "projetoamods",
  },
  {
    nomeLivro: "Quartos de despejo",
    urlCompleta:
      "https://backend-projeto-integrador-rana.onrender.com/api/livro",
    apiKey: process.env.KEY_LIVRO_QUARTOS_DESPEJO || "projetoamods",
  },
  {
    nomeLivro: "Memórias Póstumas de Brás Cubas",
    urlCompleta: "https://projeto-clubyx.onrender.com/livros",
    apiKey: process.env.KEY_LIVRO_MEMORIAS || "projetoamods",
  },
  {
    nomeLivro: "Bookverse",
    urlCompleta: "https://bookverse-back-pob5.onrender.com/livros",
    apiKey: process.env.BOOKVERSE_API_KEY || "projetoamods",
  },
  {
    nomeLivro: "Canção para ninar menino grande",
    urlCompleta: "https://atividade-portugues-backend.onrender.com/api/livro",
    apiKey: process.env.KEY_CANCAO || "chaveSecreta",
  },
  {
    nomeLivro: "Olhos d'Água",
    urlCompleta: "https://olhosdagua.onrender.com/api/livro",
    apiKey:
      process.env.KEY_OLHOS ||
      "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd",
  },
  {
    nomeLivro: "O Caminho de Pedras",
    urlCompleta: "https://devstones-backend.onrender.com/api/livro",
    apiKey: process.env.KEY_CAMINHO || "livr0",
  },
  {
    nomeLivro: "A Moreninha",
    urlCompleta: "https://clubelivro-backend.onrender.com/api/livros",
    apiKey: process.env.KEY_MORENINHA || "entreLinhas123",
  },
];

const METADADOS_LIVROS = {
  "o guarani": {
    sinopse:
      "O índio Peri e Ceci, filha de um fidalgo português, vivem um amor impossível no Brasil colonial do século XVII.",
    descricao_pt:
      "Clássico do Romantismo que constrói a identidade nacional idealizando o indígena como herói brasileiro.",
    descricao_en:
      "Romantic classic that builds national identity by idealizing the indigenous person as a Brazilian hero.",
    personagens_pt:
      "Peri (O Guarani)\nCecília (Ceci)\nDom Antônio de Mariz\nDona Lauriana\nÁlvaro\nLoredano",
    personagens_en:
      "Peri (The Guarani)\nCecilia (Ceci)\nDom António de Mariz\nDona Lauriana\nÁlvaro\nLoredano",
    contexto_historico_pt:
      "Brasil colonial do século XVII, narrado no Romantismo do século XIX com foco na valorização do índio como símbolo nacional.",
    contexto_historico_en:
      "17th-century colonial Brazil, told through 19th-century Romanticism that idealizes indigenous people as national symbols.",
    detalhes_autor_pt:
      "José de Alencar (1829–1877), pioneiro do Romantismo brasileiro, dedicou sua obra à construção da identidade cultural do país.",
    detalhes_autor_en:
      "José de Alencar (1829–1877), pioneer of Brazilian Romanticism, devoted his work to building the country's cultural identity.",
    estilo_escrita_pt:
      "Prosa poética com descrições exuberantes da natureza tropical, linguagem elevada e forte sentimentalismo.",
    estilo_escrita_en:
      "Poetic prose with lush tropical nature descriptions, elevated language and strong sentimentalism.",
    verossimilhanca_pt:
      "Mistura elementos históricos da colonização com ficção romântica idealizada.",
    verossimilhanca_en:
      "Blends historical elements of colonization with idealized romantic fiction.",
    caracteristicas_literarias_pt:
      "Nacionalismo, idealismo, amor impossível e conflito entre colonizadores e colonizados.",
    caracteristicas_literarias_en:
      "Nationalism, idealism, impossible love and conflict between colonizers and colonized.",
    conclusao_pt:
      "Cria um herói nacional genuinamente brasileiro e questiona a hierarquia racial colonial.",
    conclusao_en:
      "Creates a genuinely Brazilian national hero and questions colonial racial hierarchy.",
    simbolismo_pt:
      "Peri: o índio idealizado. A floresta: liberdade e pureza. Ceci: a inocência europeia no novo mundo.",
    simbolismo_en:
      "Peri: the idealized indigenous. The forest: freedom and purity. Ceci: European innocence in the new world.",
    engajamento_pt:
      "Promove a valorização da cultura indígena dentro da narrativa da formação da nação brasileira.",
    engajamento_en:
      "Promotes indigenous culture within the narrative of Brazilian nation-building.",
    temas_chave_pt:
      "Amor, Patriotismo, Natureza, Colonialismo, Identidade Nacional, Sacrifício, Honra",
    temas_chave_en:
      "Love, Patriotism, Nature, Colonialism, National Identity, Sacrifice, Honor",
  },

  "quartos de despejo": {
    sinopse:
      "Diário real de Carolina Maria de Jesus, catadora de papel na favela do Canindé (SP), que registra a luta diária contra a fome para sustentar seus três filhos.",
    capa_url:
      "https://www.coletivoleitor.com.br/uploads/covers/QUARTO-DE-DESPEJO_ED-COMEMORATIVA.png",
    foto: "https://www.coletivoleitor.com.br/uploads/covers/QUARTO-DE-DESPEJO_ED-COMEMORATIVA.png",
    descricao_pt:
      "Obra autobiográfica e visceral da literatura periférica brasileira, escrita por quem viveu o que descreve.",
    descricao_en:
      "Visceral autobiographical work of peripheral Brazilian literature, written by someone who lived what they describe.",
    personagens_pt:
      "Carolina Maria de Jesus\nJoão José\nJosé Carlos\nVera Eunice\nMoradores da favela do Canindé",
    personagens_en:
      "Carolina Maria of Jesus\nJoão José\nJosé Carlos\nVera Eunice\nResidents of Canindé favela",
    contexto_historico_pt:
      "Brasil do final dos anos 1950, marcado pela urbanização acelerada, desigualdade social e crescimento das favelas.",
    contexto_historico_en:
      "Brazil in the late 1950s, marked by rapid urbanization, social inequality and the growth of favelas.",
    detalhes_autor_pt:
      "Carolina Maria de Jesus (1914–1977), escritora afro-brasileira que vivia na miséria. Seu diário se tornou símbolo de resistência.",
    detalhes_autor_en:
      "Carolina Maria of Jesus (1914–1977), Afro-Brazilian writer who lived in poverty. Her diary became a symbol of resistance.",
    estilo_escrita_pt:
      "Linguagem crua e direta em formato de diário. Os 'erros' gramaticais são parte da autenticidade e do impacto poético.",
    estilo_escrita_en:
      "Raw, direct language in diary format. The grammatical 'errors' are part of its authenticity and poetic impact.",
    verossimilhanca_pt:
      "Máxima — é um diário verdadeiro. Documentação real da vida na favela, sem ficção.",
    verossimilhanca_en:
      "Maximum — it is a true diary. Real documentation of favela life, without fiction.",
    caracteristicas_literarias_pt:
      "Testemunho social, crítica implícita das estruturas de poder, lirismo na adversidade e resistência espiritual.",
    caracteristicas_literarias_en:
      "Social testimony, implicit critique of power structures, lyricism in adversity and spiritual resistance.",
    conclusao_pt:
      "Afirma a força da voz periférica e exige humanização dos marginalizados, expondo a estrutura da desigualdade.",
    conclusao_en:
      "Asserts the strength of the peripheral voice and demands humanization of the marginalized, exposing inequality structures.",
    simbolismo_pt:
      "O diário: voz silenciada que encontra fala. A favela: injustiça sistêmica. A escrita: ato de resistência e sobrevivência.",
    simbolismo_en:
      "The diary: silenced voice finding speech. The favela: systemic injustice. Writing: an act of resistance and survival.",
    engajamento_pt:
      "Denuncia a pobreza extrema e reivindica dignidade humana para os marginalizados de forma direta e pessoal.",
    engajamento_en:
      "Denounces extreme poverty and claims human dignity for the marginalized in a direct and personal way.",
    temas_chave_pt:
      "Pobreza, Fome, Maternidade, Resistência, Dignidade Humana, Desigualdade, Esperança",
    temas_chave_en:
      "Poverty, Hunger, Motherhood, Resistance, Human Dignity, Inequality, Hope",
  },

  "memorias postumas de bras cubas": {
    sinopse:
      "Um 'defunto autor' narra suas memórias fúteis com ironia afiada, expondo as hipocrisias e privilégios da elite brasileira do século XIX.",
    descricao_pt:
      "Obra-prima que inaugurou o Realismo no Brasil, famosa pela estrutura fragmentada e pelo narrador não confiável.",
    descricao_en:
      "Masterpiece that inaugurated Realism in Brazil, famous for its fragmented structure and unreliable narrator.",
    personagens_pt:
      "Brás Cubas\nVirgília\nMarcela\nQuincas Borba\nLobo Neves\nSabina\nPrudêncio",
    personagens_en:
      "Brás Cubas\nVirgília\nMarcela\nQuincas Borba\nLobo Neves\nSabina\nPrudêncio",
    contexto_historico_pt:
      "Segundo Reinado brasileiro (século XIX): sociedade escravocrata, patriarcal e dominada por uma elite oligárquica.",
    contexto_historico_en:
      "Brazilian Second Reign (19th century): slaveholding, patriarchal society dominated by an oligarchic elite.",
    detalhes_autor_pt:
      "Machado de Assis (1839–1908), maior romancista brasileiro e fundador da ABL, superou o preconceito racial para se tornar clássico universal.",
    detalhes_autor_en:
      "Machado of Assis (1839–1908), Brazil's greatest novelist and founder of the ABL, overcame racial prejudice to become a universal classic.",
    estilo_escrita_pt:
      "Ironia sistemática, digressões filosóficas, metalinguagem e narrativa fragmentada com prefácio subversivo.",
    estilo_escrita_en:
      "Systematic irony, philosophical digressions, metalanguage and fragmented narrative with a subversive preface.",
    verossimilhanca_pt:
      "Alta verossimilhança psicológica: expõe com precisão a hipocrisia humana e motivações egoístas disfarçadas de virtude.",
    verossimilhanca_en:
      "High psychological verisimilitude: precisely exposes human hypocrisy and selfish motivations disguised as virtue.",
    caracteristicas_literarias_pt:
      "Ironia, intertextualidade, crítica social oblíqua, análise psicológica e narrativa não linear.",
    caracteristicas_literarias_en:
      "Irony, intertextuality, oblique social criticism, psychological analysis and non-linear narrative.",
    conclusao_pt:
      "Revoluciona o romance brasileiro ao questionar a própria narrativa, a moral burguesa e a futilidade da existência.",
    conclusao_en:
      "Revolutionizes the Brazilian novel by questioning the narrative itself, bourgeois morality and the futility of existence.",
    simbolismo_pt:
      "Brás Cubas morto: morte das ilusões. Capítulos fragmentados: memória seletiva. A escada: ascensão social vã.",
    simbolismo_en:
      "Dead Brás Cubas: death of illusions. Fragmented chapters: selective memory. The stairs: vain social ascension.",
    engajamento_pt:
      "Crítica velada da escravidão, da hipocrisia moral da elite e da perpetuação de privilégios por sistemas injustos.",
    engajamento_en:
      "Veiled critique of slavery, elite moral hypocrisy and the perpetuation of privileges through unjust systems.",
    temas_chave_pt:
      "Morte, Memória, Hipocrisia, Futilidade, Ambição, Escravidão, Ironia, Crítica Social",
    temas_chave_en:
      "Death, Memory, Hypocrisy, Futility, Ambition, Slavery, Irony, Social Criticism",
  },

  bookverse: {
    sinopse:
      "Coletânea integrada que conecta obras clássicas e contemporâneas da literatura brasileira em um único universo.",
    descricao_pt:
      "Plataforma literária que une autores e obras clássicas brasileiras em um ecossistema interconectado.",
    descricao_en:
      "Literary platform uniting classic Brazilian authors and works in an interconnected ecosystem.",
    personagens_pt: "Capitu\nBentinho\nEscobar\nIacema\nLeonardo",
    personagens_en: "Capitu\nBentinho\nEscobar\nIacema\nLeonardo",
    contexto_historico_pt:
      "Abrange múltiplos períodos da literatura brasileira, reunidos de forma unificada e temática.",
    contexto_historico_en:
      "Spans multiple Brazilian literary periods, brought together in a unified and thematic way.",
    detalhes_autor_pt:
      "Bookverse é uma plataforma colaborativa que reúne clássicos brasileiros em um universo literário expandido.",
    detalhes_autor_en:
      "Bookverse is a collaborative platform that brings together Brazilian classics in an expanded literary universe.",
    estilo_escrita_pt:
      "Abordagem multiplataforma que integra diferentes estilos literários em uma experiência unificada.",
    estilo_escrita_en:
      "Multiplatform approach that integrates different literary styles into a unified experience.",
    verossimilhanca_pt:
      "Obras distintas compartilham temáticas e períodos históricos brasileiros, criando coerência interna.",
    verossimilhanca_en:
      "Distinct works share Brazilian themes and historical periods, creating internal coherence.",
    caracteristicas_literarias_pt:
      "Intertextualidade, diversidade de gêneros e profundidade psicológica dos personagens.",
    caracteristicas_literarias_en:
      "Intertextuality, diversity of genres and psychological depth of characters.",
    conclusao_pt:
      "Consolida a riqueza da literatura brasileira clássica e cria novas conexões entre obras atemporais.",
    conclusao_en:
      "Consolidates the richness of classic Brazilian literature and creates new connections between timeless works.",
    simbolismo_pt:
      "O universo Bookverse simboliza a continuidade e interconexão das grandes obras da literatura brasileira.",
    simbolismo_en:
      "The Bookverse universe symbolizes the continuity and interconnection of great Brazilian literary works.",
    engajamento_pt:
      "Promove e preserva a literatura brasileira clássica, criando novas audiências para gerações futuras.",
    engajamento_en:
      "Promotes and preserves classic Brazilian literature, creating new audiences for future generations.",
    temas_chave_pt:
      "Literatura, Identidade Nacional, Tradição, Inovação, Amor, Aventura, Legado Cultural",
    temas_chave_en:
      "Literature, National Identity, Tradition, Innovation, Love, Adventure, Cultural Legacy",
  },

  "vidas secas": {
    sinopse:
      "Uma família de retirantes nordestinos — Fabiano, Sinhá Vitória, dois filhos e a cachorra Baleia — foge da seca em busca de sobrevivência.",
    capa_url:
      "https://m.media-amazon.com/images/I/71h5JfmCJ1L._AC_UF1000,1000_QL80_.jpg",
    foto: "https://m.media-amazon.com/images/I/71h5JfmCJ1L._AC_UF1000,1000_QL80_.jpg",
    descricao_pt:
      "Romance do Regionalismo nordestino que retrata com realismo seco a miséria, a seca e a desumanização dos mais pobres.",
    descricao_en:
      "Novel of Northeastern regionalism that portrays, with stark realism, the misery, drought and dehumanization of the poorest.",
    personagens_pt:
      "Fabiano (pai retirante)\nSinhá Vitória (mãe)\nFilho mais velho (sem nome)\nFilho mais novo (sem nome)\nBaleia (cachorra)",
    personagens_en:
      "Fabiano (migrant father)\nSinhá Vitória (mother)\nOlder son (unnamed)\nYounger son (unnamed)\nBaleia (dog)",
    contexto_historico_pt:
      "Sertão nordestino no início do século XX: seca, latifúndio e total ausência de políticas públicas para os pobres.",
    contexto_historico_en:
      "Northeastern backlands in the early 20th century: drought, large estates and complete absence of public policies for the poor.",
    detalhes_autor_pt:
      "Graciliano Ramos (1892–1953), mestre da prosa direta e econômica, um dos maiores nomes do Modernismo brasileiro.",
    detalhes_autor_en:
      "Graciliano Ramos (1892–1953), master of direct and economical prose, one of the greatest names in Brazilian Modernism.",
    estilo_escrita_pt:
      "Prosa enxuta, quase sem adjetivos. Capítulos independentes que refletem a fragmentação da vida dos retirantes.",
    estilo_escrita_en:
      "Lean prose, nearly without adjectives. Independent chapters that reflect the fragmentation of migrants' lives.",
    verossimilhanca_pt:
      "Máxima verossimilhança, baseada em observações reais das condições dos retirantes nordestinos.",
    verossimilhanca_en:
      "Maximum verisimilitude, based on real observations of Northeastern migrants' conditions.",
    caracteristicas_literarias_pt:
      "Introspecção dos personagens, capítulos semi-independentes e linguagem que imita o isolamento dos protagonistas.",
    caracteristicas_literarias_en:
      "Character introspection, semi-independent chapters and language that mirrors the protagonists' isolation.",
    conclusao_pt:
      "Um grito de protesto contra a desigualdade estrutural e o abandono histórico do povo nordestino.",
    conclusao_en:
      "A cry of protest against structural inequality and the historical abandonment of the Northeastern people.",
    simbolismo_pt:
      "A seca: opressão sistêmica. Os filhos sem nome: desumanização. Baleia: inocência destruída pelo sistema.",
    simbolismo_en:
      "The drought: systemic oppression. The unnamed children: dehumanization. Baleia: innocence destroyed by the system.",
    engajamento_pt:
      "Denuncia a desigualdade social, a exploração do trabalhador rural e a negligência do Estado com o Nordeste.",
    engajamento_en:
      "Denounces social inequality, the exploitation of rural workers and state neglect of the Northeast.",
    temas_chave_pt:
      "Desigualdade Social, Fome, Seca, Migração Forçada, Desumanização, Falta de Direitos",
    temas_chave_en:
      "Social Inequality, Hunger, Drought, Forced Migration, Dehumanization, Lack of Rights",
  },
  // Adicionar dentro de METADADOS_LIVROS:

  "cancao para ninar menino grande": {
    sinopse:
      "Fio Jasmim, ferroviário negro, deixa um rastro de mulheres apaixonadas nas cidades por onde passa. O livro é, na verdade, sobre elas: suas vidas, dores e desejos que existem muito além desse homem.",
    descricao_pt:
      "Romance contemporâneo de Conceição Evaristo que usa a 'escrevivência' para retratar a masculinidade negra e o universo afetivo das mulheres negras no Brasil.",
    descricao_en:
      "Contemporary novel by Conceição Evaristo using 'escrevivência' to portray Black masculinity and the emotional world of Black women in Brazil.",
    personagens_pt:
      "Fio Jasmim\nJuventina (Tina)\nPérola Maria\nAurora Correa Liberto\nDolores dos Santos\nDalva Ruiva\nEleonora Distinta de Sá",
    personagens_en:
      "Fio Jasmim\nJuventina (Tina)\nPérola Maria\nAurora Correa Liberto\nDolores dos Santos\nDalva Ruiva\nEleonora Distinta de Sá",
    contexto_historico_pt:
      "Brasil contemporâneo, enraizado no racismo estrutural e no patriarcado. A ferrovia como espaço de mobilidade masculina e abandono feminino.",
    contexto_historico_en:
      "Contemporary Brazil, rooted in structural racism and patriarchy. The railway as a space of male mobility and female abandonment.",
    detalhes_autor_pt:
      "Conceição Evaristo (1946–) nasceu em favela de Belo Horizonte e se tornou uma das maiores escritoras brasileiras contemporâneas. Criou o conceito de 'escrevivência': a escrita nascida da vivência da mulher negra.",
    detalhes_autor_en:
      "Conceição Evaristo (1946–) was born in a favela in Belo Horizonte and became one of Brazil's most important contemporary writers. She created the concept of 'escrevivência': writing born from the lived experience of Black women.",
    estilo_escrita_pt:
      "Prosa poética com narrativa não linear. Cada capítulo tem uma voz feminina diferente. Os nomes dos personagens são simbólicos e carregam significados múltiplos.",
    estilo_escrita_en:
      "Poetic prose with non-linear narrative. Each chapter features a different female voice. Character names are symbolic and carry multiple meanings.",
    verossimilhanca_pt:
      "Alta verossimilhança social e afetiva, ancorada nas experiências reais da comunidade negra brasileira.",
    verossimilhanca_en:
      "High social and emotional verisimilitude, anchored in real experiences of the Brazilian Black community.",
    caracteristicas_literarias_pt:
      "Narrativa polifônica, escrevivência, nomes simbólicos, crítica ao patriarcado e ao racismo, transição entre primeira e terceira pessoa.",
    caracteristicas_literarias_en:
      "Polyphonic narrative, escrevivência, symbolic names, critique of patriarchy and racism, shifts between first and third person.",
    conclusao_pt:
      "Ao final, Juventina escreve a canção que dá título ao livro — um ato de libertação depois de 35 anos presa a um amor que nunca a escolheu de volta.",
    conclusao_en:
      "At the end, Juventina writes the song that gives the book its title — an act of liberation after 35 years bound to a love that never chose her back.",
    simbolismo_pt:
      "A ferrovia: o homem que sempre parte. A canção de ninar: o amor que infantiliza o amado. Os nomes femininos: identidades plenas que existem além do homem.",
    simbolismo_en:
      "The railway: the man who always leaves. The lullaby: love that infantilizes the beloved. The women's names: full identities that exist beyond the man.",
    engajamento_pt:
      "Denuncia a masculinidade tóxica, o racismo estrutural e a invisibilização das mulheres negras, colocando-as no centro da narrativa.",
    engajamento_en:
      "Denounces toxic masculinity, structural racism and the invisibilization of Black women, placing them at the center of the narrative.",
    temas_chave_pt:
      "Masculinidade Negra, Racismo, Patriarcado, Amor, Abandono, Identidade Feminina, Escrevivência, Resistência",
    temas_chave_en:
      "Black Masculinity, Racism, Patriarchy, Love, Abandonment, Female Identity, Escrevivência, Resistance",
  },

  "olhos dagua": {
    sinopse:
      "Coletânea de 15 contos que mergulham no cotidiano de mulheres negras e periféricas — mães, avós, trabalhadoras, sobreviventes — retratando suas dores, resistências e a beleza que persiste mesmo na adversidade.",
    descricao_pt:
      "Vencedora do Prêmio Jabuti 2015, a obra é uma das mais importantes da literatura afro-brasileira contemporânea, construída com a 'escrevivência' característica de Conceição Evaristo.",
    descricao_en:
      "Winner of the 2015 Jabuti Prize, the work is one of the most important in contemporary Afro-Brazilian literature, built with Conceição Evaristo's characteristic 'escrevivência'.",
    personagens_pt:
      "Ayoluwa\nAna Davenga\nNatalina\nDuzu-Querença\nZaíta\nLuamanda\nSalinda\nMaria\nBica\nDona Esterlinda",
    personagens_en:
      "Ayoluwa\nAna Davenga\nNatalina\nDuzu-Querença\nZaíta\nLuamanda\nSalinda\nMaria\nBica\nDona Esterlinda",
    contexto_historico_pt:
      "Brasil urbano contemporâneo, com foco na periferia e na experiência cotidiana da população negra, especialmente das mulheres.",
    contexto_historico_en:
      "Contemporary urban Brazil, focusing on the periphery and the everyday experience of Black people, especially women.",
    detalhes_autor_pt:
      "Conceição Evaristo (1946–) nasceu numa favela de BH, trabalhou como doméstica até os 25 anos e se tornou doutora em Literatura Comparada. Sua trajetória fundamenta o conceito de 'escrevivência'.",
    detalhes_autor_en:
      "Conceição Evaristo (1946–) was born in a favela in Belo Horizonte, worked as a domestic worker until age 25, and earned a PhD in Comparative Literature. Her trajectory underpins the concept of 'escrevivência'.",
    estilo_escrita_pt:
      "Prosa poética com uso marcante de palavras hifenizadas ('gozo-pranto', 'vida-estrada'). Mescla oralidade, lirismo e 'brutalismo poético': cenas duras narradas com leveza.",
    estilo_escrita_en:
      "Poetic prose with notable use of hyphenated words ('gozo-pranto', 'vida-estrada'). Blends orality, lyricism and 'poetic brutalism': harsh scenes narrated with lightness.",
    verossimilhanca_pt:
      "Máxima — os contos nascem da vivência real da autora e da comunidade negra urbana brasileira, sem idealização.",
    verossimilhanca_en:
      "Maximum — the stories are born from the real lived experience of the author and the Black urban Brazilian community, without idealization.",
    caracteristicas_literarias_pt:
      "Contos independentes com unidade temática, escrevivência, palavras-valise, oralidade, brutalismo poético e representação da ancestralidade afro-brasileira.",
    caracteristicas_literarias_en:
      "Independent stories with thematic unity, escrevivência, portmanteau words, orality, poetic brutalism and representation of Afro-Brazilian ancestry.",
    conclusao_pt:
      "A obra resgata a voz e a humanidade de mulheres silenciadas, afirmando que resistência e beleza coexistem com a dor — sem romantizá-la.",
    conclusao_en:
      "The work reclaims the voice and humanity of silenced women, affirming that resistance and beauty coexist with pain — without romanticizing it.",
    simbolismo_pt:
      "Os olhos d'água: lágrimas e memória ancestral. As palavras hifenizadas: vidas que não cabem em categorias simples. A escrita: ato de existir e resistir.",
    simbolismo_en:
      "Eyes of water: tears and ancestral memory. Hyphenated words: lives that don't fit simple categories. Writing: an act of existing and resisting.",
    engajamento_pt:
      "Obra profundamente engajada na visibilização das mulheres negras e periféricas, denunciando racismo, violência e invisibilidade social.",
    engajamento_en:
      "Deeply engaged in making Black and peripheral women visible, denouncing racism, violence and social invisibility.",
    temas_chave_pt:
      "Maternidade, Racismo, Violência, Resistência, Ancestralidade, Amor, Solidariedade, Identidade Negra",
    temas_chave_en:
      "Motherhood, Racism, Violence, Resistance, Ancestry, Love, Solidarity, Black Identity",
  },

  "o caminho de pedras": {
    sinopse:
      "Em Fortaleza nos anos 1930, Noemi — casada com o ex-militante João Jaques e mãe do pequeno Guri — se apaixona por Roberto, líder operário. Entre o amor proibido e o ativismo político, ela descobre sua própria voz e liberdade.",
    descricao_pt:
      "O romance mais politicamente engajado de Rachel de Queiroz, com um 'socialismo libertário' raro em sua obra e uma protagonista feminina que desafia os papéis impostos pela sociedade conservadora dos anos 1930.",
    descricao_en:
      "Rachel de Queiroz's most politically engaged novel, with a rare 'libertarian socialism' and a female protagonist who challenges the roles imposed by the conservative society of the 1930s.",
    personagens_pt: "Noemi\nJoão Jaques\nRoberto\nGuri\nVinte-e-Um",
    personagens_en: "Noemi\nJoão Jaques\nRoberto\nGuri\nVinte-e-Um",
    contexto_historico_pt:
      "Fortaleza, anos 1930: Era Vargas, perseguição ao movimento operário e comunista, Estado Novo e ascensão do Integralismo. Mulheres ainda excluídas da vida pública e política.",
    contexto_historico_en:
      "Fortaleza, 1930s: Vargas Era, persecution of the labor and communist movement, Estado Novo and rise of Integralism. Women still excluded from public and political life.",
    detalhes_autor_pt:
      "Rachel de Queiroz (1910–2003): única mulher do Modernismo de 30, primeira a ocupar uma cadeira na Academia Brasileira de Letras (1977) e primeira a receber o Prêmio Camões. Escreveu este romance durante uma prisão política.",
    detalhes_autor_en:
      "Rachel de Queiroz (1910–2003): the only woman of the 1930s Modernism movement, the first woman to hold a chair at the Brazilian Academy of Letters (1977) and the first to receive the Camões Prize. She wrote this novel during a political imprisonment.",
    estilo_escrita_pt:
      "Linguagem enxuta e direta, com forte carga psicológica. Diálogos intensos revelam conflitos internos. Prosa madura que equilibra análise emocional e crítica social.",
    estilo_escrita_en:
      "Lean and direct language with strong psychological depth. Intense dialogues reveal internal conflicts. Mature prose that balances emotional analysis and social critique.",
    verossimilhanca_pt:
      "Alta verossimilhança histórica e psicológica — os dilemas políticos e afetivos dos personagens refletem contradições reais do período.",
    verossimilhanca_en:
      "High historical and psychological verisimilitude — the political and emotional dilemmas of the characters reflect real contradictions of the period.",
    caracteristicas_literarias_pt:
      "Romance de 30, realismo psicológico, protagonismo feminino, crítica social e política, linguagem direta e introspectiva.",
    caracteristicas_literarias_en:
      "1930s novel, psychological realism, female protagonism, social and political critique, direct and introspective language.",
    conclusao_pt:
      "Noemi percorre um 'caminho de pedras' — cheio de obstáculos — em busca de autonomia real, tanto no amor quanto na política, num mundo que não foi feito para que mulheres escolham.",
    conclusao_en:
      "Noemi walks a 'road of stones' — full of obstacles — in search of real autonomy, both in love and in politics, in a world not built for women to choose.",
    simbolismo_pt:
      "O caminho de pedras: a luta cotidiana da mulher por liberdade. Roberto: a promessa de um mundo mais justo. João Jaques: o afeto que não basta para prender.",
    simbolismo_en:
      "The road of stones: women's daily struggle for freedom. Roberto: the promise of a more just world. João Jaques: the affection that is not enough to hold.",
    engajamento_pt:
      "Critica o autoritarismo varguista, a exploração do trabalhador e, sobretudo, a sujeição da mulher — sexual, afetiva e política — numa sociedade patriarcal.",
    engajamento_en:
      "Critiques Vargas authoritarianism, worker exploitation and, above all, the subjugation of women — sexual, emotional and political — in a patriarchal society.",
    temas_chave_pt:
      "Liberdade Feminina, Amor Proibido, Militância Política, Patriarcado, Era Vargas, Luta de Classes, Autonomia",
    temas_chave_en:
      "Female Freedom, Forbidden Love, Political Militancy, Patriarchy, Vargas Era, Class Struggle, Autonomy",
  },

  "a moreninha": {
    sinopse:
      "Augusto, estudante de medicina e namorador inveterado, aceita uma aposta: se não conquistar uma moça no prazo de um mês, escreve um romance. Durante um feriado na ilha de Paquetá, ele se apaixona por Carolina — a Moreninha — sem saber que os dois já se conhecem desde a infância.",
    descricao_pt:
      "Publicado em 1844, é o primeiro romance do Romantismo brasileiro e um retrato afetivo dos costumes da juventude carioca do século XIX.",
    descricao_en:
      "Published in 1844, it is the first novel of Brazilian Romanticism and an affectionate portrait of the customs of 19th-century Rio de Janeiro youth.",
    personagens_pt:
      "Augusto\nCarolina (a Moreninha)\nFilipe\nFabrício\nLeopoldo\nDona Ana",
    personagens_en:
      "Augusto\nCarolina (the Moreninha)\nFilipe\nFabrício\nLeopoldo\nDona Ana",
    contexto_historico_pt:
      "Rio de Janeiro do Segundo Reinado (meados do século XIX): burguesia em ascensão, costumes europeus, saraus, piqueniques e casamentos arranjados pelos pais.",
    contexto_historico_en:
      "Rio de Janeiro of the Second Reign (mid-19th century): rising bourgeoisie, European customs, soirées, picnics and marriages arranged by parents.",
    detalhes_autor_pt:
      "Joaquim Manuel de Macedo (1820–1882) estudou medicina mas dedicou-se à literatura e ao jornalismo. Foi pioneiro da prosa ficcional brasileira e um dos primeiros a retratar o cotidiano nacional em vez de copiar modelos europeus.",
    detalhes_autor_en:
      "Joaquim Manuel de Macedo (1820–1882) studied medicine but dedicated himself to literature and journalism. He was a pioneer of Brazilian fictional prose and one of the first to portray national daily life instead of copying European models.",
    estilo_escrita_pt:
      "Narrativa leve e sentimental em terceira pessoa com narrador onisciente e intrometido. Humor suave, diálogos vivos e descrições do ambiente carioca.",
    estilo_escrita_en:
      "Light and sentimental third-person narrative with an omniscient and intrusive narrator. Gentle humor, lively dialogues and descriptions of Rio's environment.",
    verossimilhanca_pt:
      "Verossimilhança dos costumes — a obra funciona como documento dos hábitos sociais da juventude burguesa carioca do século XIX.",
    verossimilhanca_en:
      "Verisimilitude of customs — the work serves as a document of the social habits of 19th-century Rio's bourgeois youth.",
    caracteristicas_literarias_pt:
      "Amor idealizado e puro, amor de infância preservado, final feliz, sentimentalismo, culto à natureza, humor leve e costumbrismo carioca.",
    caracteristicas_literarias_en:
      "Idealized and pure love, preserved childhood love, happy ending, sentimentalism, nature worship, gentle humor and Rio de Janeiro costumbrism.",
    conclusao_pt:
      "O reencontro de Augusto e Carolina revela que o amor fiel da infância superou o tempo — resolvendo a tensão entre promessa e desejo com o final feliz típico do Romantismo.",
    conclusao_en:
      "The reunion of Augusto and Carolina reveals that faithful childhood love has overcome time — resolving the tension between promise and desire with Romanticism's typical happy ending.",
    simbolismo_pt:
      "A aposta: a leveza e a irresponsabilidade da juventude. A ilha: espaço de suspensão das regras sociais. A promessa de infância: a fidelidade como valor supremo.",
    simbolismo_en:
      "The bet: the lightness and irresponsibility of youth. The island: a space where social rules are suspended. The childhood promise: fidelity as the supreme value.",
    engajamento_pt:
      "Engajamento discreto: ao retratar casamentos arranjados e mencionar a escravidão, a obra registra — sem condenar diretamente — as contradições da sociedade imperial brasileira.",
    engajamento_en:
      "Discreet engagement: by portraying arranged marriages and mentioning slavery, the work records — without directly condemning — the contradictions of imperial Brazilian society.",
    temas_chave_pt:
      "Amor Puro, Fidelidade, Promessa de Infância, Amizade, Costumes Cariocas, Juventude, Romantismo",
    temas_chave_en:
      "Pure Love, Fidelity, Childhood Promise, Friendship, Rio de Janeiro Customs, Youth, Romanticism",
  },
};

const normalize = (str = "") =>
  str
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s]/g, "")
    .toLowerCase()
    .trim();

function extrairPersonagensLista(valor) {
  if (!valor) return [];

  if (Array.isArray(valor)) {
    return valor
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") {
          const nome = item.trim();
          return nome ? { nome, descricao: null } : null;
        }

        const nome = (item.nome || item.name || item.titulo || item.title || "")
          .toString()
          .trim();
        if (!nome) return null;

        return {
          nome,
          descricao: item.descricao || item.description || null,
        };
      })
      .filter(Boolean);
  }

  if (typeof valor === "string") {
    return valor
      .split(/\r?\n|;/)
      .map((nome) => nome.trim())
      .filter(Boolean)
      .map((nome) => ({ nome, descricao: null }));
  }

  return [];
}

function incluirPersonagensNoLivro(livro) {
  if (!livro || typeof livro !== "object") return livro;

  const personagens = [
    ...extrairPersonagensLista(livro.personagens),
    ...extrairPersonagensLista(livro.personagens_pt),
    ...extrairPersonagensLista(livro.personagens_en),
  ];

  const vistos = new Set();
  const personagensUnicos = personagens.filter((personagem) => {
    const chave = normalize(personagem.nome || "");
    if (!chave || vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });

  return {
    ...livro,
    personagens: personagensUnicos,
  };
}

function similaridadeTitulo(a, b) {
  // Remove plurais simples (s/es no final) para comparação
  const sem_plural = (str) => str.replace(/es$/, "").replace(/s$/, "").trim();
  const aNorm = sem_plural(a);
  const bNorm = sem_plural(b);
  if (aNorm === bNorm) return true;
  if (a.includes(b) || b.includes(a)) return true;
  if (aNorm.includes(bNorm) || bNorm.includes(aNorm)) return true;
  // Verifica se as primeiras palavras significativas batem
  const palavrasA = a.split(" ").filter((p) => p.length > 2);
  const palavrasB = b.split(" ").filter((p) => p.length > 2);
  const matches = palavrasA.filter((p) =>
    palavrasB.some((q) => sem_plural(p) === sem_plural(q)),
  );
  return (
    matches.length >= Math.min(2, Math.min(palavrasA.length, palavrasB.length))
  );
}

function preencherMetadadosFaltantes(mapped) {
  let chave = normalize(mapped.titulo || "");
  let metadado = METADADOS_LIVROS[chave];

  if (!metadado && mapped.titulo) {
    const tituloNorm = normalize(mapped.titulo);
    for (const [key, value] of Object.entries(METADADOS_LIVROS)) {
      if (similaridadeTitulo(tituloNorm, key)) {
        metadado = value;
        break;
      }
    }
  }

  if (metadado) {
    Object.keys(metadado).forEach((campo) => {
      mapped[campo] = mapped[campo] || metadado[campo];
    });
  }
  return mapped;
}

async function fazerRequisicaoExterna(endpoint) {
  if (!endpoint.urlCompleta) return null;
  try {
    const response = await fetch(endpoint.urlCompleta, {
      method: "GET",
      headers: {
        "x-api-key": endpoint.apiKey,
        Authorization: `Bearer ${endpoint.apiKey}`,
        "Content-Type": "application/json",
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
    if (arr.length > 0 && typeof arr[0] === "object" && arr[0] !== null) {
      return arr
        .map(
          (p) => p.nome || p.name || p.titulo || p.title || JSON.stringify(p),
        )
        .join("\n");
    }
    return arr.join("\n");
  }

  let titulo =
    external.titulo ||
    external.title ||
    external.tituloDoLivro ||
    external.tituloPT ||
    external.nome ||
    null;
  let autor = external.autor || external.author || external.autores || null;

  if (!titulo && autor) {
    const autorLower = autor.toLowerCase();
    if (
      autorLower.includes("memórias") ||
      autorLower.includes("guarani") ||
      autorLower.includes("quartos") ||
      autorLower.includes("vidas") ||
      autorLower.includes("bookverse")
    ) {
      titulo = autor;
      autor = null;
    }
  }

  if (!autor && titulo) {
    const tituloLower = titulo.toLowerCase();
    if (tituloLower.includes("memórias")) {
      autor = "Machado de Assis";
    } else if (tituloLower.includes("guarani")) {
      autor = "José de Alencar";
    } else if (tituloLower.includes("quartos")) {
      autor = "Carolina Maria de Jesus";
    } else if (tituloLower.includes("vidas")) {
      autor = "Graciliano Ramos";
    }
  }

  let mapped = {
    titulo: titulo,
    autor: autor,
    anoPublicacao: external.anoPublicacao
      ? parseInt(external.anoPublicacao)
      : external.ano
        ? parseInt(external.ano)
        : external.year
          ? parseInt(external.year)
          : null,
    paginas: external.paginas
      ? parseInt(external.paginas)
      : external.pages
        ? parseInt(external.pages)
        : null,
    capa_url:
      external.capa_url ||
      external.foto ||
      external.capa ||
      external.image ||
      external.capaURL ||
      null,
    foto:
      external.foto ||
      external.capa_url ||
      external.capa ||
      external.image ||
      external.capaURL ||
      null,
    video_url: external.video_url || external.videoUrl || null,
    genero_pt: external.genero_pt || external.genero || null,
    genero_en: external.genero_en || external.genre || null,
    sinopse:
      external.sinopse || external.description || external.resumo || null,
    descricao_pt:
      external.descricao_pt || external.resumo || external.enredo || null,
    descricao_en:
      external.descricao_en || external.resumo_en || external.enredo_en || null,
    personagens_pt:
      external.personagens_pt ||
      external.personagens ||
      extrairNomesPersonagens(external.personagensArray) ||
      null,
    personagens_en:
      external.personagens_en ||
      extrairNomesPersonagens(external.personagensEn) ||
      null,
    contexto_historico_pt:
      external.contexto_historico_pt ||
      external.contexto_pt ||
      external.contexto ||
      null,
    contexto_historico_en:
      external.contexto_historico_en || external.contexto_en || null,
    detalhes_autor_pt:
      external.detalhes_autor_pt || external.detalhesAutor || null,
    detalhes_autor_en:
      external.detalhes_autor_en || external.detalhesAutor_en || null,
    estilo_escrita_pt:
      external.estilo_escrita_pt || external.estiloEscrita || null,
    estilo_escrita_en:
      external.estilo_escrita_en || external.estiloEscrita_en || null,
    verossimilhanca_pt:
      external.verossimilhanca_pt || external.verossimilhanca || null,
    verossimilhanca_en: external.verossimilhanca_en || null,
    caracteristicas_literarias_pt:
      external.caracteristicas_literarias_pt ||
      external.caracteristicasLiterarias ||
      null,
    caracteristicas_literarias_en:
      external.caracteristicas_literarias_en ||
      external.caracteristicasLiterarias_en ||
      null,
    conclusao_pt: external.conclusao_pt || external.conclusao || null,
    conclusao_en: external.conclusao_en || null,
    simbolismo_pt: external.simbolismo_pt || null,
    simbolismo_en: external.simbolismo_en || null,
    engajamento_pt: external.engajamento_pt || null,
    engajamento_en: external.engajamento_en || null,
    temas_chave_pt: external.temas_chave_pt || null,
    temas_chave_en: external.temas_chave_en || null,
    usuarioId: null,
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

    const chamadas = ENDPOINTS_CONFIG.map((endpoint) =>
      fazerRequisicaoExterna(endpoint),
    );
    const resultados = await Promise.all(chamadas);

    for (let i = 0; i < resultados.length; i++) {
      const raw = resultados[i];
      if (!raw) continue;

      const lista = Array.isArray(raw) ? raw : [raw];
      const livroEncontrado = lista.find((item) => {
        let itemTitulo =
          item.titulo || item.title || item.tituloDoLivro || item.nome || "";
        if (
          !itemTitulo &&
          item.autor &&
          item.autor.toLowerCase().includes("memórias")
        ) {
          itemTitulo = item.autor;
        }
        return normalize(itemTitulo) === normalize(termoBusca);
      });

      if (livroEncontrado) {
        const mapeado = mapExternalToInternal(livroEncontrado);
        return res.status(200).json(incluirPersonagensNoLivro(mapeado));
      }
    }

    return res
      .status(404)
      .json({ erro: "Obra não localizada nos catálogos locais ou parceiros." });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const obterBibliotecaCompleta = async (req, res) => {
  try {
    const promessas = ENDPOINTS_CONFIG.map(async (livro) => {
      try {
        if (!livro.urlCompleta) {
          return {
            livro: livro.nomeLivro,
            statusApi: "Configuração Ausente",
            conteudo: [],
          };
        }

        const resposta = await fetch(livro.urlCompleta, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": livro.apiKey,
            Authorization: `Bearer ${livro.apiKey}`,
          },
        });

        if (!resposta.ok) {
          return {
            livro: livro.nomeLivro,
            statusApi: `Erro ${resposta.status}`,
            conteudo: [],
          };
        }

        const dados = await resposta.json();
        const lista = Array.isArray(dados) ? dados : [dados];
        const mapeados = lista
          .map((item) => mapExternalToInternal(item))
          .map((item) => incluirPersonagensNoLivro(item));

        return {
          livro: livro.nomeLivro,
          statusApi: "Online",
          conteudo: mapeados,
        };
      } catch {
        return {
          livro: livro.nomeLivro,
          statusApi: "Falha de Conexão",
          conteudo: [],
        };
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
    const promessas = ENDPOINTS_CONFIG.map((endpoint) =>
      fazerRequisicaoExterna(endpoint),
    );
    const resultados = await Promise.all(promessas);

    const livros = new Map();

    resultados.forEach((raw) => {
      if (!raw) return;
      const lista = Array.isArray(raw) ? raw : [raw];
      lista.forEach((item) => {
        const mapeado = mapExternalToInternal(item);
        const chave = normalize(mapeado.titulo || "");
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
    const promessas = ENDPOINTS_CONFIG.map((endpoint) =>
      fazerRequisicaoExterna(endpoint),
    );
    const resultados = await Promise.all(promessas);

    const livrosParaImportar = [];
    const livrosTitulos = new Set();

    resultados.forEach((raw) => {
      if (!raw) return;
      const lista = Array.isArray(raw) ? raw : [raw];
      lista.forEach((item) => {
        const mapeado = mapExternalToInternal(item);
        const titulo = normalize(mapeado.titulo || "");
        if (titulo && !livrosTitulos.has(titulo)) {
          livrosTitulos.add(titulo);
          livrosParaImportar.push(mapeado);
        }
      });
    });

    const livrosCriados = await Promise.all(
      livrosParaImportar.map((livro) =>
        prisma.livro.upsert({
          where: { titulo: livro.titulo },
          update: livro,
          create: livro,
        }),
      ),
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
    const endpoint = ENDPOINTS_CONFIG.find((e) => e.nomeLivro === "O Guarani");
    if (!endpoint)
      return res
        .status(404)
        .json({ erro: "Configuração de O Guarani não encontrada" });

    const dados = await fazerRequisicaoExterna(endpoint);
    if (!dados)
      return res
        .status(404)
        .json({ erro: "Não foi possível obter dados de O Guarani" });

    const lista = Array.isArray(dados) ? dados : [dados];
    const mapeados = lista
      .map((item) => mapExternalToInternal(item))
      .map((item) => incluirPersonagensNoLivro(item));
    return res.status(200).json(mapeados);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const obterQuartosDespejo = async (req, res) => {
  try {
    const endpoint = ENDPOINTS_CONFIG.find(
      (e) => e.nomeLivro === "Quartos de despejo",
    );
    if (!endpoint)
      return res
        .status(404)
        .json({ erro: "Configuração de Quartos de Despejo não encontrada" });

    const dados = await fazerRequisicaoExterna(endpoint);
    if (!dados)
      return res
        .status(404)
        .json({ erro: "Não foi possível obter dados de Quartos de Despejo" });

    const lista = Array.isArray(dados) ? dados : [dados];
    const mapeados = lista
      .map((item) => mapExternalToInternal(item))
      .map((item) => incluirPersonagensNoLivro(item));
    return res.status(200).json(mapeados);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const obterMemoriasCubas = async (req, res) => {
  try {
    const endpoint = ENDPOINTS_CONFIG.find(
      (e) => e.nomeLivro === "Memórias Póstumas de Brás Cubas",
    );
    if (!endpoint)
      return res.status(404).json({
        erro: "Configuração de Memórias Póstumas de Brás Cubas não encontrada",
      });

    const dados = await fazerRequisicaoExterna(endpoint);
    if (!dados)
      return res.status(404).json({
        erro: "Não foi possível obter dados de Memórias Póstumas de Brás Cubas",
      });

    const lista = Array.isArray(dados) ? dados : [dados];
    const mapeados = lista
      .map((item) => mapExternalToInternal(item))
      .map((item) => incluirPersonagensNoLivro(item));
    return res.status(200).json(mapeados);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const obterBookverse = async (req, res) => {
  try {
    const endpoint = ENDPOINTS_CONFIG.find((e) => e.nomeLivro === "Bookverse");
    if (!endpoint)
      return res
        .status(404)
        .json({ erro: "Configuração de Bookverse não encontrada" });

    const dados = await fazerRequisicaoExterna(endpoint);
    if (!dados)
      return res
        .status(404)
        .json({ erro: "Não foi possível obter dados de Bookverse" });

    const lista = Array.isArray(dados) ? dados : [dados];
    const mapeados = lista
      .map((item) => mapExternalToInternal(item))
      .map((item) => incluirPersonagensNoLivro(item));
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

    const mapeado = incluirPersonagensNoLivro(
      mapExternalToInternal(dadosSimulados),
    );
    return res.status(200).json([mapeado]);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};
