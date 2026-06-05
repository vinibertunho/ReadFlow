import pg from "pg";
import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.questao.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.curiosidade.deleteMany();
  await prisma.personagem.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.integranteEquipe.deleteMany();
  await prisma.equipe.deleteMany();
  await prisma.usuario.deleteMany();

  const admin = await prisma.usuario.create({
    data: {
      nome: "Coordenador Admin",
      email: "admin@senaisesi.com",
      senhaHash: "123456",
      papel: "ADMIN",
      idiomaPreferido: "PT_BR",
    },
  });

  const editor = await prisma.usuario.create({
    data: {
      nome: "Vinícius Silva",
      email: "vinicius@senai.com",
      senhaHash: "123456",
      papel: "EDITOR",
    },
  });

  const conteudista = await prisma.usuario.create({
    data: {
      nome: "Ana Clara",
      email: "ana@sesi.com",
      senhaHash: "123456",
      papel: "EDITOR",
    },
  });

  await prisma.equipe.create({
    data: {
      nome: "Equipe ReadFlow",
      descricao:
        "Integrantes responsáveis pelo desenvolvimento e conteúdo do projeto.",
      usuarios: {
        connect: [{ id: admin.id }, { id: editor.id }, { id: conteudista.id }],
      },
      integrantes: {
        create: [
          {
            nome: "BEATRIZ_TSUMOTO",
            fotoUrl: "https://i.ibb.co/v87SkRX/beatriz.jpg",
          },
          {
            nome: "JULIA_DEGRAVA",
            fotoUrl: "https://i.ibb.co/FkRFzrGj/degrava.jpg",
          },
          {
            nome: "ISABELLA_PINESSO",
            fotoUrl: "https://i.ibb.co/W4bMqDGK/isa.jpg",
          },
          { nome: "ANA_BAGGIO", fotoUrl: "https://i.ibb.co/gLNVZDG8/ana.jpg" },
          {
            nome: "VINICIUS_BERTUNHO",
            fotoUrl: "https://i.ibb.co/JWNMPKM5/bertunho.jpg",
          },
          {
            nome: "MURILO_ROCHA",
            fotoUrl: "https://i.ibb.co/bj7KcW1w/murilo.jpg",
          },
          {
            nome: "BRYAN_REZENDE",
            fotoUrl: "https://i.ibb.co/4R8Nt0h3/bryan.jpg",
          },
          {
            nome: "EDUARDO_TONON",
            fotoUrl: "https://i.ibb.co/R4d5gtSP/edu.jpg",
          },
          {
            nome: "ELOISA_MADRUGA",
            fotoUrl: "https://i.ibb.co/GrBJ5q1/elo.jpg",
          },
          {
            nome: "CECILIA",
            fotoUrl: "https://i.ibb.co/VYDkkx3Y/cecilia.jpg",
          },
          {
            nome: "GABRIEL",
            fotoUrl: "https://i.ibb.co/4Zjy3NLB/biel.jpg",
          },
        ],
      },
    },
  });

  const libro = await prisma.livro.create({
    data: {
      titulo: "Capitães da Areia",
      autor: "Jorge Amado",
      anoPublicacao: 1937,
      genero_pt:
        "Ficção Regionalista / Romance Social / Segundo Tempo Modernista",
      genero_en:
        "Regionalist Fiction / Social Novel / Second Phase of Brazilian Modernism",
      sinopse:
        "A obra acompanha um bando de meninos de rua in Salvador que sobrevivem por meio de furtos, vivendo marginalizados em um trapiche abandonado.",
      contexto_pt:
        "Publicado em 1937 por Jorge Amado, é um clássico da segunda fase do Modernismo brasileiro. Na época de lançamento o Brasil passava pela ditadura de Getúlio Vargas (Estado Novo), marcada pela grande repressão e censura.",
      contexto_en:
        "Published in 1937 by Jorge Amado, it is a classic of the second phase of Brazilian Modernism. At the time of its release, Brazil was undergoing Getúlio Vargas' dictatorship (Estado Novo), marked by severe repression and censorship.",
      descricao_pt:
        "Aborda a história de menores abandonados em Salvador, onde a pobreza extrema contrastava com as áreas elitizadas, fazendo com que os jovens cometam atos criminosos por pura sobrevivência.",
      descricao_en:
        "Addresses the story of abandoned minors in Salvador, where extreme poverty contrasted with elite areas, forcing young people to commit criminal acts for pure survival.",
      detalhes_autor_pt:
        "Jorge Amado (1912-2001) foi um escritor brasileiro, um dos maiores representantes da fiction regionalista que marcou o Segundo Tempo Modernista. Sua obra é baseada na exposição e análise realista dos cenários rurais e urbanos da Bahia. Traduzido para mais de trinta idiomas e vencedor do Prêmio Jabuti em 1959.",
      detalhes_autor_en:
        "Jorge Amado (1912–2001) was one of Brazil’s most important writers and a major representative of regionalist fiction during the second phase of Brazilian Modernism. His works focus on realistic portrayals of rural and urban life in Bahia, translated into more than thirty languages and recipient of the Jabuti Prize in 1959.",
      estilo_escrita_pt:
        "Cenas são descritas de forma crua e por vezes repulsiva para trazer de forma explícita a desigualdade, como visto na representação da epidemia de varíola (bexiga) que assola a comunidade.",
      estilo_escrita_en:
        "Scenes are described in a raw and sometimes disturbing way to explicitly expose inequality, as seen in the depiction of the smallpox epidemic that devastates the community.",
      verossimilhanca_pt:
        "Inspirado na vida real: a narrative foi fortemente baseada em grupos reais de crianças vulneráveis que viviam em Salvador nos anos 1930. Jorge Amado observava de perto a realidade desses menores para construir seu enredo.",
      verossimilhanca_en:
        "Inspired by real life: the narrative was strongly based on real groups of vulnerable children living in Salvador during the 1930s. Jorge Amado closely observed the reality of these minors to build his plot.",
      caracteristicas_literarias_pt:
        "A obra se destaca pela fusão de denúncia social urbana e lirismo ao retratar a infância perdida. Divide-se em crônicas e episódios que expõem a visão da cidade sobre o bando.",
      caracteristicas_literarias_en:
        "The work stands out for its blend of urban social denunciation and lyricism when portraying a lost childhood. It is divided into chronicles and episodes that expose the city's view of the gang.",
      contexto_historico_pt:
        "Salvador passava por uma política desigual, dividida entre pobres da cidade baixa e ricos da cidade alta, onde a pobreza extrema contrastava com as áreas elitizadas.",
      contexto_historico_en:
        "Salvador was going through an unequal political climate, divided between the poor of the lower city and the rich of the upper city, where extreme poverty contrasted with elite areas.",
      simbolismo_pt:
        "O trapiche simboliza o abandono e exclusão social. Dora representa carinho e esperança. O mar simboliza a liberdade e sonhos, enquanto a areia representa a instabilidade e a falta de segurança.",
      simbolismo_en:
        "The warehouse symbolizes neglect and social exclusion. Dora represents affection and hope. The sea symbolizes freedom and dreams, while the sand represents instability and insecurity.",
      engajamento_pt:
        "O engajamento aparece na crítica social à pobreza, ao abandono infantil e à violência policial. Mostra que os meninos não são criminosos por escolha, mas vítimas da exclusão social. Pedro Bala desenvolve engajamento político aproximando-se das lutas trabalhistas.",
      engajamento_en:
        "Social engagement appears in the social criticism of poverty, child abandonment, and police violence. It shows that the boys are not criminals by choice, but victims of social exclusion. Pedro Bala develops political engagement by joining workers' struggles.",
      temas_chave_pt:
        "Exclusão social e criminalização da pobreza; Denúncia social e desigualdade; Luta de classes e ideologia política.",
      temas_chave_en:
        "Social Exclusion and the Criminalization of Poverty; Social Criticism and Inequality; Class Struggle and Political Ideology.",
      conclusao_pt:
        "A narrativa termina mostrando destinos distintos: Pedro Bala vira militante proletário, o Professor torna-se pintor de sucesso no Rio de Janeiro e Volta Seca junta-se ao bando de Lampião.",
      conclusao_en:
        "The narrative ends by showing different destinies: Pedro Bala becomes a proletarian militant, Professor becomes a successful painter in Rio de Janeiro, and Volta Seca joins Lampião's gang.",
      video_url: null,
      capa_url: "https://i.ibb.co/mF98znBm/capitaes.jpg",
      usuarioId: editor.id,
    },
  });

  await prisma.personagem.createMany({
    data: [
      {
        livroId: libro.id,
        nome: "Pedro Bala",
        papel_pt: "Líder dos Capitães da Areia",
        papel_en: "Leader of the Captains of the Sands",
        descricao_pt:
          "Possui espírito de líder, corajoso, com grande autoridade e forte senso de justiça. Tem 15 anos e o pai morreu com um tiro.",
        descricao_en:
          "Has a leader's spirit, brave, with great authority and a strong sense of justice. He is 15 years old, and his father died after being shot.",
        features_pt:
          "Tomou a liderança de Raimundo em uma disputa justa. Ao final, engaja-se na militância proletária.",
        features_en:
          "Took the leadership from Raimundo in a fair fight. In the end, he becomes involved in workers' political movements.",
      },
      {
        livroId: libro.id,
        nome: "Professor (João José)",
        papel_pt: "O Intelectual do Bando",
        papel_en: "The Intellectual of the Gang",
        descricao_pt:
          "Muito respeitado, é o único das crianças que sabe ler. Lia histórias e o jornal da cidade para os garotos de noite no trapiche.",
        descricao_en:
          "Highly respected, he is the only child who knows how to read. He read stories and the city newspaper to the boys at night in the warehouse.",
        features_pt:
          "Era quem planejava os furtos mais brilhantes. Ao final, muda-se para o Rio de Janeiro e torna-se pintor.",
        features_en:
          "He was the one who planned the most brilliant thefts. In the end, he moves to Rio de Janeiro and becomes a painter.",
      },
      {
        livroId: libro.id,
        nome: "João Grande",
        papel_pt: "O Protetor / Um dos Chefes",
        papel_en: "The Protector / One of the Leaders",
        descricao_pt:
          "Tem 13 anos, é o mais forte fisicamente entre os meninos e possui o maior coração do grupo.",
        descricao_en:
          "He is 13 years old, the physically strongest among the boys, and has the biggest heart in the group.",
        features_pt:
          "É um dos chefes. Pedro Bala não tomava uma decisão sequer sem antes consultá-lo.",
        features_en:
          "He is one of the leaders. Pedro Bala did not make a single decision without consulting him first.",
      },
      {
        livroId: libro.id,
        nome: "Dora",
        papel_pt: "A Única Menina do Grupo",
        papel_en: "The Only Girl in the Group",
        descricao_pt:
          "Menina órfã acolhida pelo bando que inicialmente não aceitava mulheres.",
        descricao_en:
          "Orphan girl welcomed by the gang, which initially did not accept women.",
        features_pt:
          "Passa a exercer um papel maternal e de união no trapiche, despertando o amor de Pedro Bala e do Professor.",
        features_en:
          "Begins to play a maternal and unifying role in the warehouse, awakening love in Pedro Bala and Professor.",
      },
      {
        livroId: libro.id,
        nome: "Sem-Pernas",
        papel_pt: "O Espião do Bando",
        papel_en: "The Gang's Spy",
        descricao_pt:
          "Coxo, brincalhão e sarcástico. Usava sua deficiência física para fazer com que as pessoas o acolhessem em suas casas.",
        descricao_en:
          "Lame, playful, and sarcastic. He used his physical disability to make people welcome him into their homes.",
        features_pt:
          "Infiltrava-se nas residências fingindo vulnerabilidade para facilitar e planejar os roubos do bando.",
        features_en:
          "Infiltrated residences pretending to be vulnerable to ease and plan the gang's robberies.",
      },
      {
        livroId: libro.id,
        nome: "Boa Vida",
        papel_pt: "O Malandro",
        papel_en: "The Rogue",
        descricao_pt: "Personagem com estilo malandro, pacífico e carismático.",
        descricao_en: "Character with a rogue style, peaceful and charismatic.",
        features_pt:
          "Tenta sempre ganhar e convencer as pessoas usando puramente a sua lábia.",
        features_en:
          "Always tries to win and convince people purely using his smooth-talking.",
      },
      {
        livroId: libro.id,
        nome: "Pirulito",
        papel_pt: "O Religioso",
        papel_en: "The Religious Boy",
        descricao_pt:
          "Menino muito alto, magro e profundamente espiritualizado.",
        descricao_en: "Very tall, thin, and deeply spiritual boy.",
        features_pt:
          "Representa a fé, a religiosidade e a esperança de salvação dentro do grupo.",
        features_en:
          "Represents faith, religiosity, and the hope of salvation within the group.",
      },
      {
        livroId: libro.id,
        nome: "Volta Seca",
        papel_pt: "O Guerreiro Impetuoso",
        papel_en: "The Impetuous Warrior",
        descricao_pt:
          "Menino agressivo que gostava de brigas e guardava grande ressentimento social.",
        descricao_en:
          "Aggressive boy who liked fighting and held great social resentment.",
        features_pt:
          "Abandona o trapiche ao final da trama para se juntar ao famoso bando de cangaço de Lampião.",
        features_en:
          "Leaves the warehouse at the end of the plot to join the famous cangaço gang of Lampião.",
      },
      {
        livroId: libro.id,
        nome: "Gato",
        papel_pt: "O Galã do Trapiche",
        papel_en: "The Gang's Heartthrob",
        descricao_pt:
          "Muito vaidoso, charmoso e atraente. Tentava sempre encantar as mulheres das redondezas.",
        descricao_en:
          "Very vain, charming, and attractive. Always tried to charm the women in the surroundings.",
        features_pt:
          "Apesar de namorador, era verdadeiramente apaixonado pela jovem Dalva.",
        features_en:
          "Despite being a womanizer, he was truly in love with the young Dalva.",
      },
      {
        livroId: libro.id,
        nome: "Barandão",
        papel_pt: "Futuro Líder",
        papel_en: "Future Leader",
        descricao_pt:
          "Um dos meninos fortes do trapiche com perfil de comando.",
        descricao_en:
          "One of the strong boys of the warehouse with a leadership profile.",
        features_pt:
          "Apontado internamente como o próximo líder na linha de succession dos Capitães da Areia.",
        features_en:
          "Designated internally as the next leader in the line of succession of the Captains of the Sands.",
      },
      {
        livroId: libro.id,
        nome: "Padre José Pedro",
        papel_pt: "Aliado Religioso / Protetor",
        papel_en: "Religious Ally / Protector",
        descricao_pt:
          "Padre da paróquia local que genuinamente fica do lado e defende os Capitães da Areia.",
        descricao_en:
          "Priest of the local parish who genuinely stands by and defends the Captains of the Sands.",
        features_pt:
          "Sente gratidão por estar perto deles e tenta ajudá-los abrigando-os em casas, enfrentando o preconceito da elite.",
        features_en:
          "Feels grateful to be near them and tries to help by housing them, facing the elite's prejudice.",
      },
      {
        livroId: libro.id,
        nome: "Querido de Deus",
        papel_pt: "Aliado / Mentor Físico",
        papel_en: "Ally / Physical Mentor",
        descricao_pt:
          "Pescador corajoso e muito respeitado na zona portuária de Salvador.",
        descricao_en:
          "Brave and highly respected fisherman in the port area of Salvador.",
        features_pt:
          "Grande amigo do bando, ensina os meninos do trapiche a lutarem capoeira para se defenderem.",
        features_en:
          "Great friend of the gang, teaches the warehouse boys to fight capoeira to defend themselves.",
      },
      {
        livroId: libro.id,
        nome: "João de Adão",
        papel_pt: "Mentor Político e Operário",
        papel_en: "Political and Workers' Mentor",
        descricao_pt:
          "Trabalhador das docas e antigo amigo do falecido pai de Pedro Bala.",
        descricao_en:
          "Docks worker and old friend of Pedro Bala's late father.",
        features_pt:
          "Participou de greves históricas ao lado do pai do protagonista e ajuda a despertar a consciência de classe em Pedro.",
        features_en:
          "Participated in historic strikes alongside the protagonist's father and helps awaken class consciousness in Pedro.",
      },
      {
        livroId: libro.id,
        nome: "Alberto",
        papel_pt: "Manifestante Universitário",
        papel_en: "University Activist",
        descricao_pt:
          "Estudante universitário envolvido com causas sociais e protestos políticos.",
        descricao_en:
          "University student involved in social causes and political protests.",
        features_pt:
          "Representa a união da juventude acadêmica idealista com a causa das classes menos favorecidas.",
        features_en:
          "Represents the union of idealistic academic youth with the cause of the less fortunate classes.",
      },
      {
        livroId: libro.id,
        nome: "Delegado de Polícia",
        papel_pt: "Antagonista / Braço Armado do Estado",
        papel_en: "Antagonist / Armed Wing of the State",
        descricao_pt:
          "Autoridade policial encarregada da segurança pública de Salvador.",
        descricao_en:
          "Police authority in charge of public security in Salvador.",
        features_pt:
          "Tenta sempre oprimir, perseguir e prender de forma violenta os meninos do grupo.",
        features_en:
          "Always tries to oppress, pursue, and violently arrest the boys in the group.",
      },
      {
        livroId: libro.id,
        nome: "Diretor do Reformatório / Juizado de Menores",
        papel_pt: "Antagonistas Institucionais",
        papel_en: "Institutional Antagonists",
        descricao_pt:
          "Representantes do sistema judiciário e das instituições corretivas da época.",
        descricao_en:
          "Representatives of the judicial system and corrective institutions of the time.",
        features_pt:
          "Tentam a todo custo tirar as crianças das ruas para interná-las em reformatórios, locais marcados por tortura.",
        features_en:
          "Try at all costs to remove children from the streets to institutionalize them in reformatories, places marked by torture.",
      },
    ],
  });

  await prisma.curiosidade.createMany({
    data: [
      {
        livroId: libro.id,
        titulo: "Livros Queimados pela Ditadura",
        texto:
          "Durante o governo de Getúlio Vargas, no Estado Novo, o livro foi considerado uma ameaça comunista. Consta que cerca de 808 exemplares de Capitães da Areia foram apreendidos e queimados em praça pública em Salvador logo após o lançamento.",
        autorUsuarioId: conteudista.id,
        publicado: true,
      },
      {
        livroId: libro.id,
        titulo: "Críticas Severas ao Sistema",
        texto:
          "Além de expor a fome e o abandono, Jorge Amado usou a obra para fazer duras críticas aos reformatórios da época (onde os menores sofriam torturas medonhas) e à hipocrisia da sociedade burguesa e do clero.",
        autorUsuarioId: conteudista.id,
        publicado: true,
      },
      {
        livroId: libro.id,
        titulo: "O Resgate de Ogum",
        texto:
          "O sincretismo religioso e a cultura afro-brasileira são traços fortíssimos na narrativa: em determinado momento do livro, os meninos se unem e ajudam a resgatar uma imagem mística do orixá Ogum que havia sido ilegalmente roubada e confiscada pela polícia.",
        autorUsuarioId: conteudista.id,
        publicado: true,
      },
    ],
  });

  const quizPT = await prisma.quiz.create({
    data: {
      livroId: libro.id,
      titulo: "Quiz Oficial - Capitães da Areia",
      descricao:
        "Teste seus conhecimentos sobre os personagens, simbolismos e capítulos de Jorge Amado.",
      idioma: "PT_BR",
      tempoLimiteMin: null,
    },
  });

  await prisma.questao.createMany({
    data: [
      {
        quizId: quizPT.id,
        enunciado:
          "No capítulo 'As luzes do Carrossel', o que o brinquedo antigo desbotado e furado representa na vida dos meninos?",
        alternativaA:
          "Um local estratégico perfeito para planejar novos furtos comerciais.",
        alternativaB:
          "Um momento de deslumbramento onde eles viveram o que realmente deveria ser a infância deles, divertindo-se como as crianças que eram.",
        alternativaC:
          "Uma armadilha arquitetada pelo Delegado de Polícia para capturar Pedro Bala.",
        alternativaD:
          "O palanque político onde João de Adão discursou sobre as greves operárias.",
        alternativaE:
          "O esconderijo secreto de Dora após sua fuga do reformatório baiano.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "O carrossel traz o vislumbre da infância pura e inocente que foi roubada deles pela miséria das ruas.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual é a principal função e tática usada pelo personagem Sem-Pernas para ajudar nos crimes do bando?",
        alternativaA:
          "Ele usava sua força física para arrombar portões pesados na Cidade Alta.",
        alternativaB:
          "Ele lia os jornais da cidade para prever onde estaria o policiamento dia a dia.",
        alternativaC:
          "Por ser coxo, ele gerava piedade nas pessoas, infiltrando-se nas casas para facilitar os roubos posteriores do grupo.",
        alternativaD:
          "Ele usava sua lábia de malandro para negociar os itens roubados com receptores.",
        alternativaE:
          "Ele subia em mastros de saveiros para vigiar a chegada do Diretor do Reformatório.",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Sem-Pernas usava o fato de ser deficiente físico para se passar por vulnerável e espiar as casas das vítimas.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Na estrutura da obra, de acordo com o texto fornecido, o que o 'Mar' e a 'Areia' simbolizam respectivamente?",
        alternativaA: "A riqueza da elite e o abandono absoluto do trapiche.",
        alternativaB:
          "O preconceito religioso do clero e a tortura física do juizado.",
        alternativaC:
          "A liberdade/sonho de uma vida melhor e a instabilidade/falta de segurança na vida dos personagens.",
        alternativaD:
          "A violência cotidiana da polícia e o amor maternal desempenhado por Dora.",
        alternativaE:
          "A subida para a Cidade Alta e a miséria geográfica concentrada na Cidade Baixa.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "O mar representa a imensidão da liberdade, enquanto a areia denota a falta de firmeza e a vulnerabilidade social deles.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual era o local que servia de moradia e quartel-general para o bando dos Capitães da Areia?",
        alternativaA: "Um porão esquecido sob o mercado municipal.",
        alternativaB: "Um trapiche abandonado nas praias de Salvador.",
        alternativaC: "Os túneis subterrâneos da Igreja do Passo.",
        alternativaD: "Antigas embações naufragadas no porto marítimo.",
        alternativaE: "Barracos improvisados nos morros da Cidade Alta.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "O trapiche abandonado é o cenário central que abriga os meninos e simboliza a sua marginalização social.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual personagem é conhecido por ser o único integrante do bando alfabetizado, responsável por ler para os outros?",
        alternativaA: "Pirulito",
        alternativaB: "Pedro Bala",
        alternativaC: "Professor",
        alternativaD: "Gato",
        alternativaE: "Sem-Pernas",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "O Professor usava sua habilidade de leitura para contar histórias e ler jornais à noite no trapiche.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "O que acontece com o personagem Volta Seca no desfecho da narrativa de Jorge Amado?",
        alternativaA: "Torna-se um marinheiro mercante.",
        alternativaB: "É adotado por uma família rica da Cidade Alta.",
        alternativaC: "Consegue emprego fixo como operário nas docas.",
        alternativaD: "Junta-se ao bando de cangaço liderado por Lampião.",
        alternativaE: "Torna-se um líder religioso dedicado aos necessitados.",
        gabarito: "D",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "Guiado por seu rancor social e revolta, Volta Seca parte para o sertão para integrar o cangaço.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual era a principal causa da morte do pai de Pedro Bala, fato que moldou a consciência do protagonista?",
        alternativaA: "Uma forte epidemia de varíola que assolou a cidade.",
        alternativaB: "Um acidente de trabalho grave nas docas do porto.",
        alternativaC: "Baleado pela polícia durante uma greve operária.",
        alternativaD: "Um naufrágio durante uma tempestade em alto-mar.",
        alternativaE:
          "Tuberculose decorrente das péssimas condições habitacionais.",
        gabarito: "C",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "O pai de Pedro Bala era um líder grevista que acabou assassinado pelas forças policiais do Estado.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Como a chegada de Dora altera a dinâmica interna dos meninos que habitavam o trapiche?",
        alternativaA:
          "Provoca uma divisão violenta e irreversível com o bando se fragmentando.",
        alternativaB:
          "Desperta sentimentos maternais e de união, preenchendo o vazio afetivo do grupo.",
        alternativaC:
          "Faz com que os meninos abandonem completamente as práticas de furtos.",
        alternativaD:
          "Atrai a atenção imediata da polícia, que destrói o quartel-general.",
        alternativaE:
          "Gera a expulsão imediata de Pedro Bala do posto de liderança.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Dora passa a ser vista não apenas como par romântico, mas assume funções de mãe e irmã, unindo o grupo.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Quem é o pescador que ensina capoeira aos Capitães da Areia para que possam se defender nas ruas?",
        alternativaA: "João de Adão",
        alternativaB: "Querido de Deus",
        alternativaC: "Padre José Pedro",
        alternativaD: "Raimundo",
        alternativaE: "Good Life",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Querido de Deus é o valente pescador e amigo que atua como um mentor físico e protetor dos jovens.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual grave crise de saúde pública atinge o trapiche e evidencia o total abandono médico sofrido pelos menores?",
        alternativaA: "A epidemia de febre amarela.",
        alternativaB: "O surto de cólera trazido pelos navios.",
        alternativaC: "A epidemia de varíola, conhecida como bexiga.",
        alternativaD: "A proliferação em massa da malária.",
        alternativaE: "Uma crise generalizada de desinteria.",
        gabarito: "C",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "A varíola (ou bexiga) assola a comunidade pobre e infecta gravemente membros do bando, como o Sem-Pernas.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual o destino do personagem conhecido como 'Professor' ao final do livro?",
        alternativaA: "É preso em flagrante e condenado à prisão perpétua.",
        alternativaB:
          "Muda-se para o Rio de Janeiro e ganha reconhecimento como pintor.",
        alternativaC: "Assume em definitivo a liderança dos Capitães da Areia.",
        alternativaD: "Torna-se um jornalista renomado em Salvador.",
        alternativaE:
          "Falece em decorrência das agressões sofridas no reformatório.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Graças ao seu talento artístico bruto, o Professor ganha uma oportunidade de ir para o Rio e vira um pintor de sucesso.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "O personagem Pirulito destaca-se dentro do bando por apresentar qual característica marcante?",
        alternativaA: "Uma inclinação obsessiva pelo acúmulo de moedas.",
        alternativaB:
          "Uma profunda religiosidade e constante busca por salvação espiritual.",
        alternativaC:
          "Uma agilidade descomunal para abrir fechaduras de casarões.",
        alternativaD: "Um temperamento extremamente agressivo com rivais.",
        alternativaE: "O hábito de cantar modinhas nas praças de Salvador.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Pirulito encontra na fé e nos ensinamentos religiosos uma forma de lidar com a dura realidade em que vive.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Por qual motivo o livro Capitães da Areia sofreu censura e queima de exemplares no ano de seu lançamento?",
        alternativaA:
          "Por conter erros crassos de gramática e linguagem coloquial excessiva.",
        alternativaB:
          "Por fazer propaganda explícita de potências estrangeiras na América do Sul.",
        alternativaC:
          "Por ser considerado uma ameaça de cunho comunista e subversivo pelo Estado Novo.",
        alternativaD:
          "A pedido da própria prefeitura de Salvador para não manchar o turismo local.",
        alternativaE:
          "Por infringir leis vigentes de direitos autorais da época.",
        gabarito: "C",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "O engajamento social e político de Jorge Amado fez com que a ditadura de Vargas confiscasse e queimasse a obra.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Quem é o principal aliado dos meninos dentro da Igreja Católica, criticado pela alta liderança clerical por essa proximidade?",
        alternativaA: "Padre Donizete",
        alternativaB: "Padre José Pedro",
        alternativaC: "Frei Antônio",
        alternativaD: "Arcebispo de Salvador",
        alternativaE: "Padre Lourenço",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "O Padre José Pedro os enxerga como seres humanos necessitados de apoio, batendo de frente com o preconceito da elite.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "O personagem Gato afasta-se progressivamente das ações cotidianas do bando após envolver-se com quem?",
        alternativaA: "Com uma rica herdeira da Cidade Alta.",
        alternativaB: "Com a jovem prostituta Dalva.",
        alternativaC: "Com uma das freiras do orfanato local.",
        alternativaD: "Com uma comerciante do Mercado Modelo.",
        alternativaE: "Com uma artista de circo itinerante.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Gato apaixona-se por Dalva e passa a focar sua vida na malandragem para sustentá-la.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "O que a trágica morte do personagem Sem-Pernas representa no contexto da obra?",
        alternativaA: "O descaso total das redes de saúde privada da Bahia.",
        alternativaB:
          "O ápice do desespero juvenil perante o cerco violento da polícia.",
        alternativaC:
          "A punição moral por ele ter traído a confiança dos companheiros.",
        alternativaD:
          "O resultado direto de uma disputa interna pelo comando do grupo.",
        alternativaE:
          "Um infeliz acidente sem motivações psicológicas subjacentes.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Ao ver-se encurralado pela polícia que tanto odiava, Sem-Pernas prefere tirar a própria vida saltando do penhasco.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual a importância política das docas e do porto de Salvador na formação de Pedro Bala?",
        alternativaA:
          "Era apenas o local onde ele escondia os produtos furtados da elite.",
        alternativaB:
          "É o espaço onde ele faz contato com grevistas e descobre a luta de classes.",
        alternativaC:
          "Representava a chance de fugir do país em um navio cargueiro estrangeiro.",
        alternativaD:
          "Funcionava como fonte de renda secundária através do trabalho infantil legalizado.",
        alternativaE:
          "Era o único ponto da cidade livre da atuação do Delegado de Polícia.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "O ambiente portuário aproxima Pedro Bala de líderes operários como João de Adão, despertando sua consciência política.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Como o reformatório da cidade é retratado por Jorge Amado na narrativa?",
        alternativaA:
          "Como uma instituição educacional exemplar e inovadora para a época.",
        alternativaB:
          "Como um espaço higienista focado na reinserção pacífica de menores.",
        alternativaC:
          "Como um local de tortura, violência crassa e maus-tratos institucionalizados.",
        alternativaD:
          "Como uma colônia de férias monitorada por voluntários religiosos.",
        alternativaE:
          "Como um abrigo seguro onde a alimentação era farta e balanceada.",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "O reformatório funciona como o grande vilão institucional da obra, que destrói a dignidade física e psicológica das crianças.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "No desfecho do livro, qual caminho definitivo Pedro Bala escolhe seguir?",
        alternativaA: "Inicia os estudos acadêmicos para se tornar advogado.",
        alternativaB:
          "Abandona a Bahia para viver como fazendeiro no interior do país.",
        alternativaC:
          "Torna-se um líder e militante da causa proletária e das lutas trabalhistas.",
        alternativaD:
          "Assume cargos administrativos no Juizado de Menores de Salvador.",
        alternativaE:
          "Decide viver isolado como pescador na comunidade portuária.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "Pedro Bala converte sua liderança criminosa de rua em liderança política legítima, lutando pelos direitos dos trabalhadores.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "A narrativa de Capitães da Areia é dividida de uma forma literária específica que mescla:",
        alternativaA: "Poemas românticos medievais e contos fantásticos.",
        alternativaB:
          "Crônicas jornalísticas, recortes de notícias fictícias e episódios líricos.",
        alternativaC:
          "Cartas comerciais reais e relatórios oficiais da prefeitura.",
        alternativaD:
          "Roteiros teatrais clássicos e passagens puramente científicas.",
        alternativaE:
          "Textos de jornais internacionais e ensaios filosóficos densos.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Jorge Amado usa relatos de jornais falsos da época para mostrar o contraste entre a visão preconceituosa da cidade e a realidade dos garotos.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "O que acontece com Dora logo após ser capturada junto com Pedro Bala pelas forças policiais?",
        alternativaA:
          "É enviada imediatamente de volta para a casa de seus parentes.",
        alternativaB:
          "Consegue fugir pulando da viatura no meio do trajeto portuário.",
        alternativaC:
          "É internada no Orfanato dos Olhos D'Água, onde adoece gravemente.",
        alternativaD:
          "É absolvida pelo juiz de menores devido à sua pouca idade.",
        alternativaE:
          "É contratada como empregada doméstica na residência do prefeito.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "A internação no orfanato deteriora por completo a saúde de Dora, levando-a a contrair uma febre fatal.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual orixá tem sua imagem mística resgatada pelos meninos em uma demonstração de respeito ao sincretismo religioso?",
        alternativaA: "Oxum",
        alternativaB: "Ogum",
        alternativaC: "Iemanjá",
        alternativaD: "Xangô",
        alternativaE: "Oxóssi",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Os meninos ajudam a recuperar a imagem de Ogum confiscada de um terreiro pela polícia repressora da época.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Quem é o integrante do bando conhecido por ser o mais forte fisicamente e que atua como o braço direito de Pedro Bala?",
        alternativaA: "Boa Vida",
        alternativaB: "João Grande",
        alternativaC: "Barandão",
        alternativaD: "Raimundo",
        alternativaE: "Volta Seca",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "João Grande possui grande força física, mas equilibra isso com um coração enorme e lealdade cega a Pedro Bala.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "A elite de Salvador e a imprensa local da época costumavam se referir aos Capitães da Areia como:",
        alternativaA: "Jovens aprendizes promissores do porto.",
        alternativaB: "Vítimas inocentes da falta de escolas públicas.",
        alternativaC: "Ladrões perigosos, delinquentes e peste social.",
        alternativaD: "Artistas de rua incompreendidos pela burguesia.",
        alternativaE: "Apenas um grupo de escoteiros rebeldes sem supervisão.",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "A imprensa burguesa criminalizava a pobreza dos garotos, pintando-os puramente como criminosos cruéis e irrecuperáveis.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual o nome do personagem pacífico, que vive o dia a dia na malandragem sem grandes ambições e é extremamente carismático?",
        alternativaA: "Sem-Pernas",
        alternativaB: "Boa Vida",
        alternativaC: "Pirulito",
        alternativaD: "Professor",
        alternativaE: "Gato",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Boa Vida contenta-se com o básico da sobrevivência na malandragem pacífica, evitando brigas desnecessárias.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Quem assume o posto de liderança oficial e futura dos Capitães da Areia quando Pedro Bala se afasta para a militância?",
        alternativaA: "João Grande",
        alternativaB: "Barandão",
        alternativaC: "Pirulito",
        alternativaD: "Boa Vida",
        alternativaE: "Professor",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Barandão é preparado internamente e assume a dianteira para guiar os novos garotos que chegam ao trapiche.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "O livro Capitães da Areia é inserido em qual período e corrente da literatura brasileira?",
        alternativaA: "Primeira Fase do Romantismo Indianista.",
        alternativaB: "Realismo de Machado de Assis.",
        alternativaC: "Romance Social de 30 / Segunda Fase do Modernismo.",
        alternativaD: "Parnasianismo e poesia descritiva.",
        alternativaE: "Poesia Concreta de vanguarda paulista.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "A obra faz parte do Modernismo de 1930, caracterizado pela denúncia da desigualdade regional e crítica social direta.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Qual a postura da maioria das famílias aristocráticas da Cidade Alta em relação aos menores desamparados?",
        alternativaA:
          "Criação de fundações de caridade voltadas para adotá-los.",
        alternativaB:
          "Total indiferença misturada com medo, preconceito e clamor por repressão policial.",
        alternativaC:
          "Financiamento de oficinas de qualificação profissional nas docas.",
        alternativaD:
          "Abertura de suas propriedades rurais para abrigar as crianças.",
        alternativaE:
          "Pressão no parlamento por leis de inclusão escolar obrigatória.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "A elite via as crianças de rua como estorvos estéticos e ameaças ao patrimônio privado, ignorando as causas da miséria.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "Como Jorge Amado humaniza os personagens do bando ao longo do livro?",
        alternativaA:
          "Mostrando que todos eles possuíam contas bancárias secretas.",
        alternativaB:
          "Expondo seus medos, dores infantis, sonhos de liberdade e a profunda carência afetiva.",
        alternativaC:
          "Fazendo com que todos pedissem desculpas públicas em praça de Salvador.",
        alternativaD:
          "Provando cientificamente que eles eram geneticamente superiores aos ricos.",
        alternativaE:
          "Transformando todos em heróis perfeitos que nunca cometiam erros ou pequenos crimes.",
        gabarito: "B",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "O autor equilibra os crimes que eles cometem com momentos de doçura, brincadeiras e o sofrimento gerado pela falta de uma família.",
      },
      {
        quizId: quizPT.id,
        enunciado:
          "O desfecho lírico da morte de Dora é marcado por qual elemento místico e simbólico visto pelos meninos?",
        alternativaA: "A queda de uma grande barreira de pedras no porto.",
        alternativaB:
          "Uma estrela brilhante cadente cruzando o céu em direção ao mar.",
        alternativaC:
          "O aparecimento de um navio fantasma iluminado no horizonte.",
        alternativaD:
          "Um arco-íris perfeito cortando a Cidade Baixa em plena noite.",
        alternativaE:
          "O canto em massa de todas as aves marinhas do trapiche abandonado.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Os garotos enxergam uma estrela cadente sumindo no mar e associam o fenômeno à subida da alma de Dora aos céus como uma constelação.",
      },
    ],
  });

  const quizEN = await prisma.quiz.create({
    data: {
      livroId: libro.id,
      titulo: "Official Quiz - Captains of the Sands",
      descricao:
        "Test your knowledge about the characters, symbolism and chapters of Jorge Amado's novel.",
      idioma: "EN",
      tempoLimiteMin: null,
    },
  });

  await prisma.questao.createMany({
    data: [
      {
        quizId: quizEN.id,
        enunciado:
          "In the chapter 'The Lights of the Carousel', what does the old, faded and worn-out ride represent in the boys' lives?",
        alternativaA:
          "A perfect strategic spot to plan new commercial thefts.",
        alternativaB:
          "A moment of wonder in which they lived what their childhood should truly have been, having fun like the children they were.",
        alternativaC:
          "A trap set up by the Police Chief to capture Pedro Bala.",
        alternativaD:
          "The political platform where João de Adão gave speeches about the workers' strikes.",
        alternativaE:
          "Dora's secret hideout after her escape from the Bahian reformatory.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "The carousel brings a glimpse of the pure and innocent childhood that was stolen from them by the misery of the streets.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What is the main role and tactic used by the character Sem-Pernas to help with the gang's crimes?",
        alternativaA:
          "He used his physical strength to break down heavy gates in the Upper City.",
        alternativaB:
          "He read the city newspapers to predict where the police would patrol each day.",
        alternativaC:
          "Being lame, he aroused people's pity, infiltrating houses to make the group's later robberies easier.",
        alternativaD:
          "He used his trickster's smooth talk to negotiate stolen items with fences.",
        alternativaE:
          "He climbed the masts of sailboats to watch for the arrival of the Reformatory Director.",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Sem-Pernas used the fact that he was physically disabled to pass as vulnerable and spy on the victims' houses.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "In the structure of the work, according to the text provided, what do the 'Sea' and the 'Sand' symbolize respectively?",
        alternativaA:
          "The wealth of the elite and the absolute abandonment of the warehouse.",
        alternativaB:
          "The religious prejudice of the clergy and the physical torture of the juvenile court.",
        alternativaC:
          "Freedom/the dream of a better life and the instability/lack of security in the characters' lives.",
        alternativaD:
          "The daily violence of the police and the maternal love embodied by Dora.",
        alternativaE:
          "The climb to the Upper City and the geographic misery concentrated in the Lower City.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "The sea represents the vastness of freedom, while the sand denotes their lack of firmness and their social vulnerability.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What was the place that served as home and headquarters for the Captains of the Sands gang?",
        alternativaA: "A forgotten basement beneath the municipal market.",
        alternativaB: "An abandoned warehouse on the beaches of Salvador.",
        alternativaC: "The underground tunnels of the Passo Church.",
        alternativaD: "Old shipwrecked vessels in the seaport.",
        alternativaE: "Makeshift shacks on the hills of the Upper City.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "The abandoned warehouse is the central setting that shelters the boys and symbolizes their social marginalization.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Which character is known for being the only literate member of the gang, responsible for reading to the others?",
        alternativaA: "Pirulito",
        alternativaB: "Pedro Bala",
        alternativaC: "Professor",
        alternativaD: "Gato",
        alternativaE: "Sem-Pernas",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "The Professor used his reading ability to tell stories and read newspapers at night in the warehouse.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What happens to the character Volta Seca at the end of Jorge Amado's narrative?",
        alternativaA: "He becomes a merchant sailor.",
        alternativaB: "He is adopted by a wealthy family from the Upper City.",
        alternativaC: "He gets a steady job as a worker at the docks.",
        alternativaD: "He joins the cangaço gang led by Lampião.",
        alternativaE: "He becomes a religious leader devoted to the needy.",
        gabarito: "D",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "Driven by his social resentment and revolt, Volta Seca leaves for the backlands to join the cangaço.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What was the main cause of the death of Pedro Bala's father, an event that shaped the protagonist's conscience?",
        alternativaA: "A severe smallpox epidemic that ravaged the city.",
        alternativaB: "A serious work accident at the port's docks.",
        alternativaC: "Shot by the police during a workers' strike.",
        alternativaD: "A shipwreck during a storm on the high seas.",
        alternativaE:
          "Tuberculosis resulting from terrible housing conditions.",
        gabarito: "C",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Pedro Bala's father was a strike leader who ended up murdered by the State's police forces.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "How does Dora's arrival change the internal dynamic of the boys who lived in the warehouse?",
        alternativaA:
          "It causes a violent and irreversible split, with the gang fragmenting.",
        alternativaB:
          "It awakens maternal feelings and unity, filling the group's emotional void.",
        alternativaC:
          "It makes the boys completely abandon their thieving practices.",
        alternativaD:
          "It immediately attracts the attention of the police, who destroy the headquarters.",
        alternativaE:
          "It leads to the immediate expulsion of Pedro Bala from the leadership post.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Dora comes to be seen not only as a romantic partner, but takes on the roles of mother and sister, uniting the group.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Who is the fisherman who teaches capoeira to the Captains of the Sands so they can defend themselves on the streets?",
        alternativaA: "João de Adão",
        alternativaB: "Querido de Deus",
        alternativaC: "Padre José Pedro",
        alternativaD: "Raimundo",
        alternativaE: "Boa Vida",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Querido de Deus is the brave fisherman and friend who acts as a physical mentor and protector of the youths.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Which serious public health crisis hits the warehouse and highlights the total medical neglect suffered by the minors?",
        alternativaA: "The yellow fever epidemic.",
        alternativaB: "The cholera outbreak brought by the ships.",
        alternativaC: "The smallpox epidemic, known as 'bexiga'.",
        alternativaD: "The mass spread of malaria.",
        alternativaE: "A widespread dysentery crisis.",
        gabarito: "C",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Smallpox (or 'bexiga') ravages the poor community and seriously infects members of the gang, such as Sem-Pernas.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What is the fate of the character known as the 'Professor' at the end of the book?",
        alternativaA:
          "He is caught red-handed and sentenced to life imprisonment.",
        alternativaB:
          "He moves to Rio de Janeiro and gains recognition as a painter.",
        alternativaC:
          "He permanently takes over the leadership of the Captains of the Sands.",
        alternativaD: "He becomes a renowned journalist in Salvador.",
        alternativaE:
          "He dies as a result of the beatings suffered in the reformatory.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Thanks to his raw artistic talent, the Professor gets a chance to go to Rio and becomes a successful painter.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "The character Pirulito stands out within the gang for displaying which striking trait?",
        alternativaA:
          "An obsessive inclination toward hoarding coins.",
        alternativaB:
          "A deep religiosity and a constant search for spiritual salvation.",
        alternativaC:
          "An extraordinary agility for picking the locks of mansions.",
        alternativaD: "An extremely aggressive temper with rivals.",
        alternativaE:
          "The habit of singing little songs in the squares of Salvador.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Pirulito finds in faith and religious teachings a way to cope with the harsh reality in which he lives.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Why did the book Captains of the Sands suffer censorship and book burning in the year of its release?",
        alternativaA:
          "For containing gross grammatical errors and excessive colloquial language.",
        alternativaB:
          "For making explicit propaganda for foreign powers in South America.",
        alternativaC:
          "For being considered a communist and subversive threat by the Estado Novo.",
        alternativaD:
          "At the request of the city of Salvador itself, so as not to harm local tourism.",
        alternativaE:
          "For infringing the copyright laws in force at the time.",
        gabarito: "C",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Jorge Amado's social and political engagement led the Vargas dictatorship to confiscate and burn the work.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Who is the boys' main ally within the Catholic Church, criticized by the high clerical leadership for that closeness?",
        alternativaA: "Padre Donizete",
        alternativaB: "Padre José Pedro",
        alternativaC: "Frei Antônio",
        alternativaD: "Arcebispo de Salvador",
        alternativaE: "Padre Lourenço",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Padre José Pedro sees them as human beings in need of support, clashing with the prejudice of the elite.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "The character Gato progressively distances himself from the gang's daily activities after getting involved with whom?",
        alternativaA: "With a wealthy heiress from the Upper City.",
        alternativaB: "With the young prostitute Dalva.",
        alternativaC: "With one of the nuns from the local orphanage.",
        alternativaD: "With a merchant from the Mercado Modelo.",
        alternativaE: "With a traveling circus performer.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Gato falls in love with Dalva and starts focusing his life on hustling to support her.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What does the tragic death of the character Sem-Pernas represent in the context of the work?",
        alternativaA:
          "The total negligence of Bahia's private health networks.",
        alternativaB:
          "The peak of youthful despair in the face of the violent police siege.",
        alternativaC:
          "Moral punishment for having betrayed his companions' trust.",
        alternativaD:
          "The direct result of an internal dispute over the group's command.",
        alternativaE:
          "An unfortunate accident with no underlying psychological motivations.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Finding himself cornered by the police he so hated, Sem-Pernas chooses to take his own life by jumping off the cliff.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What is the political importance of the docks and the port of Salvador in Pedro Bala's development?",
        alternativaA:
          "It was just the place where he hid the goods stolen from the elite.",
        alternativaB:
          "It is the space where he makes contact with strikers and discovers the class struggle.",
        alternativaC:
          "It represented the chance to flee the country on a foreign cargo ship.",
        alternativaD:
          "It worked as a secondary source of income through legalized child labor.",
        alternativaE:
          "It was the only point in the city free from the Police Chief's activity.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "The port environment brings Pedro Bala close to workers' leaders such as João de Adão, awakening his political conscience.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "How is the city's reformatory portrayed by Jorge Amado in the narrative?",
        alternativaA:
          "As an exemplary and innovative educational institution for its time.",
        alternativaB:
          "As a hygienist space focused on the peaceful reintegration of minors.",
        alternativaC:
          "As a place of torture, gross violence and institutionalized mistreatment.",
        alternativaD:
          "As a summer camp monitored by religious volunteers.",
        alternativaE:
          "As a safe shelter where food was plentiful and balanced.",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "The reformatory works as the great institutional villain of the work, destroying the children's physical and psychological dignity.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "At the end of the book, which definitive path does Pedro Bala choose to follow?",
        alternativaA:
          "He begins academic studies to become a lawyer.",
        alternativaB:
          "He leaves Bahia to live as a farmer in the country's interior.",
        alternativaC:
          "He becomes a leader and militant of the proletarian cause and the labor struggles.",
        alternativaD:
          "He takes administrative positions at the Juvenile Court of Salvador.",
        alternativaE:
          "He decides to live in isolation as a fisherman in the port community.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "Pedro Bala converts his criminal street leadership into legitimate political leadership, fighting for workers' rights.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "The narrative of Captains of the Sands is divided in a specific literary form that blends:",
        alternativaA: "Medieval romantic poems and fantastical tales.",
        alternativaB:
          "Journalistic chronicles, clippings of fictional news and lyrical episodes.",
        alternativaC:
          "Real commercial letters and official reports from the city hall.",
        alternativaD:
          "Classic theatrical scripts and purely scientific passages.",
        alternativaE:
          "International newspaper texts and dense philosophical essays.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Jorge Amado uses fake newspaper reports from the era to show the contrast between the city's prejudiced view and the boys' reality.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What happens to Dora right after she is captured along with Pedro Bala by the police forces?",
        alternativaA:
          "She is immediately sent back to her relatives' home.",
        alternativaB:
          "She manages to escape by jumping from the police vehicle midway along the port route.",
        alternativaC:
          "She is committed to the Olhos D'Água Orphanage, where she falls seriously ill.",
        alternativaD:
          "She is acquitted by the juvenile judge due to her young age.",
        alternativaE:
          "She is hired as a maid at the mayor's residence.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "Confinement in the orphanage completely deteriorates Dora's health, leading her to contract a fatal fever.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Which orixá has its mystical image rescued by the boys in a demonstration of respect for religious syncretism?",
        alternativaA: "Oxum",
        alternativaB: "Ogum",
        alternativaC: "Iemanjá",
        alternativaD: "Xangô",
        alternativaE: "Oxóssi",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "The boys help recover the image of Ogum confiscated from a terreiro by the repressive police of the time.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Who is the member of the gang known for being the physically strongest and who acts as Pedro Bala's right-hand man?",
        alternativaA: "Boa Vida",
        alternativaB: "João Grande",
        alternativaC: "Barandão",
        alternativaD: "Raimundo",
        alternativaE: "Volta Seca",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "João Grande possesses great physical strength, but balances it with a huge heart and blind loyalty to Pedro Bala.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "The elite of Salvador and the local press of the time used to refer to the Captains of the Sands as:",
        alternativaA: "Promising young apprentices of the port.",
        alternativaB: "Innocent victims of the lack of public schools.",
        alternativaC: "Dangerous thieves, delinquents and a social plague.",
        alternativaD: "Street artists misunderstood by the bourgeoisie.",
        alternativaE: "Just a group of rebellious, unsupervised scouts.",
        gabarito: "C",
        dificuldade: "FACIL",
        comentarioResolucao:
          "The bourgeois press criminalized the boys' poverty, painting them purely as cruel and irredeemable criminals.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What is the name of the peaceful character, who lives day to day by hustling without great ambitions and is extremely charismatic?",
        alternativaA: "Sem-Pernas",
        alternativaB: "Boa Vida",
        alternativaC: "Pirulito",
        alternativaD: "Professor",
        alternativaE: "Gato",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "Boa Vida is content with the basics of survival through peaceful hustling, avoiding unnecessary fights.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "Who takes over the official and future leadership post of the Captains of the Sands when Pedro Bala leaves for activism?",
        alternativaA: "João Grande",
        alternativaB: "Barandão",
        alternativaC: "Pirulito",
        alternativaD: "Boa Vida",
        alternativaE: "Professor",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "Barandão is prepared internally and steps up to guide the new boys who arrive at the warehouse.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "In which period and movement of Brazilian literature is the book Captains of the Sands placed?",
        alternativaA: "First Phase of Indianist Romanticism.",
        alternativaB: "The Realism of Machado de Assis.",
        alternativaC:
          "The Social Novel of the 1930s / Second Phase of Modernism.",
        alternativaD: "Parnassianism and descriptive poetry.",
        alternativaE: "Avant-garde Concrete Poetry from São Paulo.",
        gabarito: "C",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "The work is part of 1930s Modernism, characterized by the denunciation of regional inequality and direct social critique.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "What was the stance of most aristocratic families of the Upper City toward the helpless minors?",
        alternativaA:
          "Creating charitable foundations aimed at adopting them.",
        alternativaB:
          "Total indifference mixed with fear, prejudice and demands for police repression.",
        alternativaC:
          "Funding professional training workshops at the docks.",
        alternativaD:
          "Opening their rural properties to shelter the children.",
        alternativaE:
          "Pressuring parliament for mandatory school inclusion laws.",
        gabarito: "B",
        dificuldade: "FACIL",
        comentarioResolucao:
          "The elite saw the street children as aesthetic nuisances and threats to private property, ignoring the causes of misery.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "How does Jorge Amado humanize the gang's characters throughout the book?",
        alternativaA:
          "By showing that they all had secret bank accounts.",
        alternativaB:
          "By exposing their fears, childhood pains, dreams of freedom and deep emotional neediness.",
        alternativaC:
          "By making them all publicly apologize in a square in Salvador.",
        alternativaD:
          "By scientifically proving they were genetically superior to the rich.",
        alternativaE:
          "By turning them all into perfect heroes who never made mistakes or committed petty crimes.",
        gabarito: "B",
        dificuldade: "MEDIA",
        comentarioResolucao:
          "The author balances the crimes they commit with moments of sweetness, play and the suffering caused by the lack of a family.",
      },
      {
        quizId: quizEN.id,
        enunciado:
          "The lyrical ending of Dora's death is marked by which mystical and symbolic element seen by the boys?",
        alternativaA: "The collapse of a large barrier of rocks at the port.",
        alternativaB:
          "A bright shooting star crossing the sky toward the sea.",
        alternativaC:
          "The appearance of an illuminated ghost ship on the horizon.",
        alternativaD:
          "A perfect rainbow cutting through the Lower City in the middle of the night.",
        alternativaE:
          "The mass singing of all the seabirds of the abandoned warehouse.",
        gabarito: "B",
        dificuldade: "DIFICIL",
        comentarioResolucao:
          "The boys see a shooting star vanishing into the sea and associate the phenomenon with Dora's soul rising to the heavens as a constellation.",
      },
    ],
  });

  console.log("🌱 [Prisma Seed]: O banco de dados foi populado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
