import pg from "pg";
import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Resetando o banco de dados (novo schema)...");

  // deletar em ordem que respeita dependências
  await prisma.questao.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.curiosidade.deleteMany();
  await prisma.personagem.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.integranteEquipe.deleteMany();
  await prisma.equipe.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("📦 Inserindo usuários de exemplo...");

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

  console.log("👥 Inserindo equipe e integrantes...");

  const equipe = await prisma.equipe.create({
    data: {
      nome: "Equipe ReadFlow",
      descricao: "Integrantes responsáveis pelo desenvolvimento e conteúdo do projeto.",
      usuarios: {
        connect: [
          { id: admin.id },
          { id: editor.id },
          { id: conteudista.id },
        ],
      },
      integrantes: {
        create: [
          { nome: "BEATRIZ_TSUMOTO" },
          { nome: "JULIA_DEGRAVA" },
          { nome: "ISABELLA_PINESSO" },
          { nome: "ANA_BAGGIO" },
          { nome: "VINICIUS_BERTUNHO" },
          { nome: "MURILO_ROCHA" },
        ],
      },
    },
  });

  console.log("📚 Inserindo livro, personagens, curiosidades e quiz...");

  // Conteúdo estruturado do Livro baseado no seu Schema e nos cards informativos
  const livroData = {
    titulo: "Capitães da Areia",
    autor: "Jorge Amado",
    anoPublicacao: 1937,
    genero_pt: "Romance Social / Literatura Modernista",
    genero_en: "Social Novel / Modernist Literature",
    sinopse: "A vida de um group de menores abandonados que vivem em um trapiche em Salvador, Bahia, sobrevivendo de pequenos furtos e golpes, enquanto enfrentam as mazelas da desigualdade social.",
    
    // Contextos (Dados do card "Contexto histórico")
    contexto_pt: "Publicado em 1937 durante a Era Vargas, o livro sofreu severa censura do Estado Novo, tendo exemplares queimados em praça pública em Salvador devido ao seu forte caráter de denúncia social.",
    contexto_en: "Published in 1937 during the Vargas Era, the book suffered severe censorship from the Estado Novo regime, with copies burned in public squares in Salvador due to its strong character of social denunciation.",
    
    // Descrições (Dados do card "Temas chave")
    descricao_pt: "Aborda a marginalização da infância urbana, destacando temas fundamentais como a solidariedade do grupo, a busca incessante pela liberdade, a desigualdade social e o forte preconceito de classe.",
    descricao_en: "Addresses the marginalization of urban childhood, highlighting fundamental themes such as group solidarity, the unceasing pursuit of freedom, social inequality, and strong class prejudice.",
    
    // Detalhes do Autor
    detalhes_autor_pt: "Jorge Amado (1912–2001) foi um dos escritores brasileiros mais célebres do século XX. Sua obra é profundamente marcada pelo engajamento político e pela defesa das classes marginalizadas.",
    detalhes_autor_en: "Jorge Amado (1912–2001) was one of the most celebrated Brazilian writers of the 20th century. His work is deeply marked by political engagement and the defense of marginalized classes.",
    
    // Estilo de Escrita
    estilo_escrita_pt: "Fusão marcante de realismo cru com lirismo poético. O autor utiliza linguagem coloquial e expressões regionais da Bahia para aproximar o leitor da realidade dos meninos.",
    estilo_escrita_en: "A striking fusion of raw realism with poetic lyricism. The author utilizes colloquial language and regional expressions from Bahia to bring the reader closer to the boys' reality.",
    
    // Verossimilhança (Dados do card "Engajamento")
    verossimilhanca_pt: "A narrativa humaniza os jovens infratores, demonstrando com forte teor crítico que a criminalidade juvenil não é uma escolha inata, mas sim um reflexo direto da falta de afeto e de oportunidades estruturais.",
    verossimilhanca_en: "The narrative humanizes young offenders, demonstrating with sharp criticism that juvenile criminality is not an innate choice, but rather a direct reflection of a lack of affection and structural opportunities.",
    
    // Características Literárias (Dados do card "Simbolismo")
    caracteristicas_literarias_pt: "Rica em elementos simbólicos: o trapiche serve como metáfora para o único lar e refúgio dos rejeitados, enquanto a imensidão do mar personifica o desejo de liberdade e o destino incerto dos jovens.",
    caracteristicas_literarias_en: "Rich in symbolic elements: the abandoned warehouse serves as a metaphor for the only home and refuge for the rejected, while the vastness of the sea personifies the desire for freedom and the uncertain destiny of the youth.",
    
    // Conclusão
    conclusao_pt: "Capitães da Areia consolida-se como um clássico indispensável da literatura nacional, mantendo-se perfeitamente atemporal ao expor as feridas e contradições sociais e urbanas do Brasil.",
    conclusao_en: "Capitães da Areia consolidates itself as an indispensable classic of national literature, remaining perfectly timeless by exposing Brazil's social and urban wounds and contradictions.",
    
    video_url: null,
    capa_url: "https://i.ibb.co/dsQ2s4TQ/Design-sem-nome-2.png",
    usuarioId: editor.id,
  };

  // ERRO CORRIGIDO AQUI: lIvrData alterado para livroData
  const livro = await prisma.livro.create({
    data: livroData,
  });

  // Personagens principais preenchidos
  await prisma.personagem.createMany({
    data: [
      { livroId: livro.id, nome: "Pedro Bala", descricao: "O líder do grupo, justo e corajoso, respeitado por todos os meninos do trapiche." },
      { livroId: livro.id, nome: "Dora", descricao: "A única menina do grupo, que assume um papel maternal e amoroso antes de se tornar o grande amor de Pedro Bala." },
      { livroId: livro.id, nome: "Sem-Pernas", descricao: "Um menino coxo e amargurado que atua como espião do grupo nas casas que pretendem assaltar." },
      { livroId: livro.id, nome: "Volta Seca", descricao: "Um jovem admirador do cangaceiro Lampião, que carrega um forte sentimento de revolta contra as autoridades." },
    ],
  });

  // Curiosidade real inserida
  await prisma.curiosidade.createMany({
    data: [
      {
        livroId: livro.id,
        titulo: "Livros Queimados",
        texto: "Logo após o seu lançamento em 1937, cerca de 808 exemplares de Capitães da Areia foram apreendidos e queimados em praça pública em Salvador, sob o pretexto de que a obra fazia propaganda comunista.",
        autorUsuarioId: conteudista.id,
        publicado: true,
      },
    ],
  });

  const quizPT = await prisma.quiz.create({
    data: {
      livroId: livro.id,
      titulo: "Quiz - Capitães da Areia (Português)",
      descricao: "20 questões sobre o clássico de Jorge Amado",
      idioma: "PT_BR",
      tempoLimiteMin: null,
    },
  });

  const quizEN = await prisma.quiz.create({
    data: {
      livroId: livro.id,
      titulo: "Quiz - Captains of the Sands (English)",
      descricao: "20 questions about Jorge Amado's classic",
      idioma: "EN",
      tempoLimiteMin: null,
    },
  });

  // Questões em Português
  const questoesPT = [
    {
      enunciado: "Qual é o nome da organização de meninos de rua no romance 'Capitães da Areia'?",
      alternativaA: "Banda da Praia",
      alternativaB: "Capitães da Areia",
      alternativaC: "Garotos do Porto",
      alternativaD: "Filhos do Mar",
      alternativaE: "Guerreiros da Rua",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao: "O grupo de meninos de rua é chamado de Capitães da Areia.",
    },
    {
      enunciado: "Quem é o Capitão do grupo de Capitães da Areia?",
      alternativaA: "Sem-Pernas",
      alternativaB: "Pedro Bala",
      alternativaC: "Gato",
      alternativaD: "Volta Seca",
      alternativaE: "Alvarado",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao: "Pedro Bala é o líder e capitão do grupo dos Capitães da Areia.",
    },
    {
      enunciado: "Em qual cidade o romance 'Capitães da Areia' é ambientado?",
      alternativaA: "Rio de Janeiro",
      alternativaB: "São Paulo",
      alternativaC: "Salvador",
      alternativaD: "Recife",
      alternativaE: "Manaus",
      gabarito: "C",
      dificuldade: "FACIL",
      comentarioResolucao: "A história se passa em Salvador, Bahia.",
    },
    {
      enunciado: "Qual é a profissão do personagem Sem-Pernas antes de entrar para o grupo?",
      alternativaA: "Vendedor de jornais",
      alternativaB: "Carregador de carga",
      alternativaC: "Menino de recado",
      alternativaD: "Lavador de roupa",
      alternativaE: "Aprendiz de sapateiro",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao: "Sem-Pernas vendia jornais nas ruas antes de se juntar aos Capitães.",
    },
    {
      enunciado: "Quem é Dora no romance?",
      alternativaA: "Mãe de Pedro Bala",
      alternativaB: "Professora que protege os meninos",
      alternativaC: "A única menina do grupo",
      alternativaD: "Filha do Capitão",
      alternativaE: "Mulher de Alvarado",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao: "Dora é a única menina que faz parte do grupo dos Capitães da Areia.",
    },
    {
      enunciado: "Qual é o nome do cais onde os meninos vivem?",
      alternativaA: "Cais do Saveiro",
      alternativaB: "Cais do Ouro",
      alternativaC: "Cais da Barra",
      alternativaD: "Cais do Porto",
      alternativaE: "Cais do Comércio",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao: "Os Capitães da Areia vivem no Cais do Saveiro.",
    },
    {
      enunciado: "Qual personagem é conhecido por sua habilidade de roubo e sua lealdade ao grupo?",
      alternativaA: "Alvarado",
      alternativaB: "Gato",
      alternativaC: "Volta Seca",
      alternativaD: "Querido-de-Deus",
      alternativaE: "Batuqueiro",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao: "Gato é um hábil ladrão e personagem importante no grupo.",
    },
    {
      enunciado: "Qual é o tema central do romance 'Capitães da Areia'?",
      alternativaA: "A aventura no mar",
      alternativaB: "A redenção e os marginalizados da sociedade",
      alternativaC: "O comércio de drogas",
      alternativaD: "A guerra civil",
      alternativaE: "A busca por ouro",
      gabarito: "B",
      dificuldade: "DIFICIL",
      comentarioResolucao: "O romance trata da redenção e da humanidade dos marginalizados sociais.",
    },
    {
      enunciado: "Quem persegue constantemente os Capitães da Areia?",
      alternativaA: "O Capitão do Porto",
      alternativaB: "O Delegado de Polícia",
      alternativaC: "O Juiz da Vara",
      alternativaD: "O Chefe da Guarda",
      alternativaE: "O Governador",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao: "O Delegado de Polícia busca constantemente capturar o grupo.",
    },
    {
      enunciado: "O romance é estruturado em qual formato literário?",
      alternativaA: "Diário",
      alternativaB: "Cartas",
      alternativaC: "Relatos de vários narradores",
      alternativaD: "Monólogo",
      alternativaE: "Poesia",
      gabarito: "C",
      dificuldade: "DIFICIL",
      comentarioResolucao: "O romance é narrado por diferentes perspectivas e vozes.",
    },
    {
      enunciado: "Qual personagem é um violão e músico do grupo?",
      alternativaA: "Batuqueiro",
      alternativaB: "Querido-de-Deus",
      alternativaC: "Volta Seca",
      alternativaD: "Gato",
      alternativaE: "Alvarado",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao: "Batuqueiro é o músico que toca violão para o grupo.",
    },
    {
      enunciado: "Qual é a relação de Pedro Bala com o candomblé?",
      alternativaA: "É sacerdote",
      alternativaB: "É perseguidor",
      alternativaC: "Frequenta e respeita a religião",
      alternativaD: "É indiferente",
      alternativaE: "Nega completamente",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao: "Pedro Bala frequenta e respeita a religião afro-brasileira.",
    },
    {
      enunciado: "Quantos personagens principais formam o núcleo central do grupo?",
      alternativaA: "5",
      alternativaB: "8",
      alternativaC: "10",
      alternativaD: "12",
      alternativaE: "15",
      gabarito: "C",
      dificuldade: "DIFICIL",
      comentarioResolucao: "O grupo possui aproximadamente 10 personagens principais.",
    },
    {
      enunciado: "Qual é o destino de Pedro Bala ao final do romance?",
      alternativaA: "Morre em confronto com a polícia",
      alternativaB: "Retorna a sua família rica",
      alternativaC: "Participa de movimentos sociais",
      alternativaD: "Desaparece sem deixar rastros",
      alternativaE: "Torna-se um criminoso profissional",
      gabarito: "C",
      dificuldade: "DIFICIL",
      comentarioResolucao: "Pedro Bala segue para participar de movimentos sociais.",
    },
    {
      enunciado: "Qual o papel da mãe de santo no romance?",
      alternativaA: "Antagonista principal",
      alternativaB: "Protetora espiritual do grupo",
      alternativaC: "Inimiga dos meninos",
      alternativaD: "Rival de Pedro Bala",
      alternativaE: "Policiais disfarçada",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao: "A mãe de santo oferece proteção espiritual e moral ao grupo.",
    },
    {
      enunciado: "Qual é a origem social dos meninos do grupo?",
      alternativaA: "Todos são de famílias ricas",
      alternativaB: "Todos são órfãos",
      alternativaC: "São marginalizados, pobres e sem família",
      alternativaD: "São filhos de políticos",
      alternativaE: "São todos filhos de comerciantes",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao: "Os Capitães são meninos marginalizados, pobres e muitos órfãos.",
    },
    {
      enunciado: "Qual personagem morre durante o romance de forma trágica?",
      alternativaA: "Pedro Bala",
      alternativaB: "Sem-Pernas",
      alternativaC: "Volta Seca",
      alternativaD: "Gato",
      alternativaE: "Dora",
      gabarito: "E",
      dificuldade: "DIFICIL",
      comentarioResolucao: "Dora morre devido a uma forte febre após o período de reclusão no reformatório.",
    },
    {
      enunciado: "Qual é a crítica social principal que Jorge Amado faz no romance?",
      alternativaA: "A corrupção governamental",
      alternativaB: "A injustiça social e abandono de crianças pobres",
      alternativaC: "A exploration pelos patrões",
      alternativaD: "A falta de escolas",
      alternativaE: "O tráfico de escravos",
      gabarito: "B",
      dificuldade: "DIFICIL",
      comentarioResolucao: "O romance critica a injustiça social e o abandono de crianças pobres.",
    },
    {
      enunciado: "Em que ano foi publicado 'Capitães da Areia'?",
      alternativaA: "1925",
      alternativaB: "1937",
      alternativaC: "1945",
      alternativaD: "1952",
      alternativaE: "1960",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao: "'Capitães da Areia' foi publicado em 1937 por Jorge Amado.",
    },
  ];

  // Questões em Inglês
  const questoesEN = [
    {
      enunciado: "What is the name of the street boys' organization in the novel 'Captains of the Sands'?",
      alternativaA: "Beach Gang",
      alternativaB: "Captains of the Sands",
      alternativaC: "Port Boys",
      alternativaD: "Sons of the Sea",
      alternativaE: "Street Warriors",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao: "The group of street boys is called Captains of the Sands.",
    },
    {
      enunciado: "Who is the Captain of the Captains of the Sands group?",
      alternativaA: "Legless",
      alternativaB: "Pedro Bala",
      alternativaC: "Cat",
      alternativaD: "Dry Rotation",
      alternativaE: "Alvarado",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao: "Pedro Bala is the leader and captain of the Captains of the Sands.",
    },
    {
      enunciado: "In which city is the novel 'Captains of the Sands' set?",
      alternativaA: "Rio de Janeiro",
      alternativaB: "São Paulo",
      alternativaC: "Salvador",
      alternativaD: "Recife",
      alternativaE: "Manaus",
      gabarito: "C",
      dificuldade: "FACIL",
      comentarioResolucao: "The story takes place in Salvador, Bahia.",
    },
    {
      enunciado: "What was the profession of the character Legless before joining the group?",
      alternativaA: "Newspaper seller",
      alternativaB: "Cargo handler",
      alternativaC: "Messenger boy",
      alternativaD: "Laundry worker",
      alternativaE: "Shoe apprentice",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao: "Legless sold newspapers on the streets before joining the Captains.",
    },
    {
      enunciado: "Who is Dora in the novel?",
      alternativaA: "Mother of Pedro Bala",
      alternativaB: "Teacher who protects the boys",
      alternativaC: "The only girl in the group",
      alternativaD: "Daughter of the Captain",
      alternativaE: "Wife of Alvarado",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao: "Dora is the only girl who is part of the Captains of the Sands group.",
    },
    {
      enunciado: "What is the name of the wharf where the boys live?",
      alternativaA: "Saveiro Wharf",
      alternativaB: "Gold Wharf",
      alternativaC: "Bar Wharf",
      alternativaD: "Port Wharf",
      alternativaE: "Commerce Wharf",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao: "The Captains of the Sands live at the Saveiro Wharf.",
    },
    {
      enunciado: "Which character is known for his theft skills and loyalty to the group?",
      alternativaA: "Alvarado",
      alternativaB: "Cat",
      alternativaC: "Dry Rotation",
      alternativaD: "God's Beloved",
      alternativaE: "Drummer",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao: "Cat is a skilled thief and important character in the group.",
    },
    {
      enunciado: "What is the central theme of the novel 'Captains of the Sands'?",
      alternativaA: "Adventure at sea",
      alternativaB: "Redemption and the marginalized of society",
      alternativaC: "Drug trafficking",
      alternativaD: "Civil war",
      alternativaE: "Search for gold",
      gabarito: "B",
      dificuldade: "DIFICIL",
      comentarioResolucao: "The novel deals with redemption and the humanity of socially marginalized people.",
    },
    {
      enunciado: "Who constantly pursues the Captains of the Sands?",
      alternativaA: "The Port Captain",
      alternativaB: "The Police Delegate",
      alternativaC: "The Judge",
      alternativaD: "The Guard Chief",
      alternativaE: "The Governor",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao: "The Police Delegate constantly seeks to capture the group.",
    },
    {
      enunciado: "In what literary format is the novel structured?",
      alternativaA: "Diary",
      alternativaB: "Letters",
      alternativaC: "Reports from multiple narrators",
      alternativaD: "Monologue",
      alternativaE: "Poetry",
      gabarito: "C",
      dificuldade: "DIFICIL",
      comentarioResolucao: "The novel is narrated from different perspectives and voices.",
    },
    {
      enunciado: "Which character is a guitarist and musician of the group?",
      alternativaA: "Drummer",
      alternativaB: "God's Beloved",
      alternativaC: "Dry Rotation",
      alternativaD: "Cat",
      alternativaE: "Alvarado",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao: "The Drummer is the musician who plays guitar for the group.",
    },
    {
      enunciado: "What is Pedro Bala's relationship with candomblé?",
      alternativaA: "He is a priest",
      alternativaB: "He is a persecutor",
      alternativaC: "He frequents and respects the religion",
      alternativaD: "He is indifferent",
      alternativaE: "He completely denies it",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao: "Pedro Bala frequents and respects the Afro-Brazilian religion.",
    },
    {
      enunciado: "How many main characters form the central nucleus of the group?",
      alternativaA: "5",
      alternativaB: "8",
      alternativaC: "10",
      alternativaD: "12",
      alternativaE: "15",
      gabarito: "C",
      dificuldade: "DIFICIL",
      comentarioResolucao: "The group has approximately 10 main characters.",
    },
    {
      enunciado: "What is Pedro Bala's destiny at the end of the novel?",
      alternativaA: "Dies in confrontation with the police",
      alternativaB: "Returns to his wealthy family",
      alternativaC: "Participates in social movements",
      alternativaD: "Disappears without a trace",
      alternativaE: "Becomes a professional criminal",
      gabarito: "C",
      dificuldade: "DIFICIL",
      comentarioResolucao: "Pedro Bala goes on to participate in social movements.",
    },
    {
      enunciado: "What is the role of the priestess in the novel?",
      alternativaA: "Main antagonist",
      alternativaB: "Spiritual protector of the group",
      alternativaC: "Enemy of the boys",
      alternativaD: "Pedro Bala's rival",
      alternativaE: "Disguised police",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao: "The priestess offers spiritual and moral protection to the group.",
    },
    {
      enunciado: "What is the social origin of the boys in the group?",
      alternativaA: "All are from wealthy families",
      alternativaB: "All are orphans",
      alternativaC: "They are marginalized, poor and without family",
      alternativaD: "All are children of politicians",
      alternativaE: "All are merchants' sons",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao: "The Captains are marginalized poor boys and many are orphans.",
    },
    {
      enunciado: "Which character dies tragically during the novel?",
      alternativaA: "Pedro Bala",
      alternativaB: "Legless",
      alternativaC: "Dry Rotation",
      alternativaD: "Cat",
      alternativaE: "Dora",
      gabarito: "E",
      dificuldade: "DIFICIL",
      comentarioResolucao: "Dora dies from a severe fever after her time in the orphanage/reformatoy.",
    },
    {
      enunciado: "What is the main social criticism that Jorge Amado makes in the novel?",
      alternativaA: "Government corruption",
      alternativaB: "Social injustice and abandonment of poor children",
      alternativaC: "Exploitation by employers",
      alternativaD: "Lack of schools",
      alternativaE: "Slave trafficking",
      gabarito: "B",
      dificuldade: "DIFICIL",
      comentarioResolucao: "The novel criticizes social injustice and the abandonment of poor children.",
    },
    {
      enunciado: "In what year was 'Captains of the Sands' published?",
      alternativaA: "1925",
      alternativaB: "1937",
      alternativaC: "1945",
      alternativaD: "1952",
      alternativaE: "1960",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao: "'Captains of the Sands' was published in 1937 by Jorge Amado.",
    },
  ];

  // Inserir questões em Português
  for (const questao of questoesPT) {
    await prisma.questao.create({
      data: {
        quizId: quizPT.id,
        ...questao,
      },
    });
  }

  // Inserir questões em Inglês
  for (const questao of questoesEN) {
    await prisma.questao.create({
      data: {
        quizId: quizEN.id,
        ...questao,
      },
    });
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });