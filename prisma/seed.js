import pg from "pg";
import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Resetando o banco de dados...");

  await prisma.respostaTentativa.deleteMany();
  await prisma.tentativaSimulado.deleteMany();
  await prisma.questao.deleteMany();
  await prisma.simulado.deleteMany();
  await prisma.conteudo.deleteMany();
  await prisma.personagem.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.equipeMembro.deleteMany();
  await prisma.equipe.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("📦 Inserindo Equipes e Usuários...");

  const equipeAlpha = await prisma.equipe.create({
    data: {
      nome: "Equipe SENAI+SESI 2026",
      descricao: "Equipe responsável pelo projeto Capitães da Areia.",
    },
  });

  const admin = await prisma.usuario.create({
    data: {
      nome: "Coordenador Admin",
      email: "admin@senaisesi.com",
      senhaHash: "123456",
      papel: "ADMIN",
      idiomaPreferido: "PT_BR",
    },
  });

  const alunoDev = await prisma.usuario.create({
    data: {
      nome: "Vinícius Silva",
      email: "vinicius@senai.com",
      senhaHash: "123456",
      papel: "EDITOR",
    },
  });

  const alunoConteudo = await prisma.usuario.create({
    data: {
      nome: "Ana Clara",
      email: "ana@sesi.com",
      senhaHash: "123456",
      papel: "EDITOR",
    },
  });

  await prisma.equipeMembro.createMany({
    data: [
      {
        equipeId: equipeAlpha.id,
        usuarioId: alunoDev.id,
        funcao: "DEV_FULLSTACK",
      },
      {
        equipeId: equipeAlpha.id,
        usuarioId: alunoConteudo.id,
        funcao: "CONTEUDISTA_BILÍNGUE",
      },
    ],
  });

  console.log("📚 Inserindo Livros e Personagens...");

  const livroPrincipal = await prisma.livro.create({
    data: {
      titulo: "Capitães da Areia",
      autor: "Jorge Amado",
      anoPublicacao: 1937,
      sinopse:
        "A obra retrata a vida de um grupo de menores abandonados que vivem nas ruas de Salvador.",
      capaUrl: "https://ibb.co/6R0jzHXy.jpg",
      equipeId: equipeAlpha.id,
      isLivroPrincipal: true,
    },
  });

  await prisma.personagem.createMany({
    data: [
      {
        livroId: livroPrincipal.id,
        nome: "Pedro Bala",
        descricao:
          "Líder do grupo Capitães da Areia, destemido e com forte senso de justiça.",
      },
      {
        livroId: livroPrincipal.id,
        nome: "Dora",
        descricao:
          "Única figura feminina do bando, atuando como mãe e irmã dos meninos.",
      },
      {
        livroId: livroPrincipal.id,
        nome: "Professor",
        descricao: "O intelectual do grupo que lê livros e conta histórias.",
      },
    ],
  });

  console.log("📝 Inserindo Conteúdos e Simulados...");

  await prisma.conteudo.createMany({
    data: [
      {
        livroId: livroPrincipal.id,
        tipo: "RESUMO",
        idioma: "PT_BR",
        titulo: "Resumo da Obra",
        texto:
          "O livro acompanha um grupo de mais de cem meninos de rua em Salvador...",
        autorUsuarioId: alunoConteudo.id,
        publicado: true,
      },
      {
        livroId: livroPrincipal.id,
        tipo: "RESUMO",
        idioma: "EN",
        titulo: "Book Summary",
        texto:
          "The book follows a group of over a hundred street children in Salvador...",
        autorUsuarioId: alunoConteudo.id,
        publicado: true,
      },
    ],
  });

  const simulado = await prisma.simulado.create({
    data: {
      livroId: livroPrincipal.id,
      titulo: "Simulado ENEM - Capitães da Areia",
      descricao:
        "Questões de literatura focadas na segunda geração do modernismo.",
      idioma: "PT_BR",
      tempoLimiteMin: 30,
    },
  });

  const bancoQuestoes = [
    {
      enunciado: "Quem é reconhecido como líder do grupo Capitães da Areia?",
      alternativaA: "Professor",
      alternativaB: "Volta Seca",
      alternativaC: "Pedro Bala",
      alternativaD: "Sem-Pernas",
      alternativaE: "João Grande",
      gabarito: "C",
      dificuldade: "FACIL",
      comentarioResolucao:
        "Pedro Bala é a liderança mais marcante entre os meninos e conduz muitas das ações do grupo.",
    },
    {
      enunciado: "Qual personagem traz mais afeto e cuidado ao grupo?",
      alternativaA: "Dora",
      alternativaB: "Volta Seca",
      alternativaC: "Gato",
      alternativaD: "Pirulito",
      alternativaE: "Boa-Vida",
      gabarito: "A",
      dificuldade: "FACIL",
      comentarioResolucao:
        "Dora introduz cuidado, acolhimento e uma presença afetiva entre os meninos.",
    },
    {
      enunciado: "A principal crítica social do romance está ligada a que tema?",
      alternativaA: "A vida luxuosa da elite baiana",
      alternativaB: "A busca por ouro no sertão",
      alternativaC: "O abandono e a violência contra menores em situação de rua",
      alternativaD: "A imigração europeia para o Sul do país",
      alternativaE: "A vida dos coronéis no interior paulista",
      gabarito: "C",
      dificuldade: "FACIL",
      comentarioResolucao:
        "A obra denuncia o abandono social e a vulnerabilidade das crianças em Salvador.",
    },
    {
      enunciado: "Sem-Pernas usa qual estratégia para circular entre as casas ricas?",
      alternativaA: "Finge fragilidade para despertar compaixão",
      alternativaB: "Vende jornais para a polícia",
      alternativaC: "Toca instrumentos para distrair os moradores",
      alternativaD: "Se apresenta como estudante estrangeiro",
      alternativaE: "Trabalha como carregador no mercado central",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "Ele usa a própria condição para enganar adultos e mapear casas para o grupo.",
    },
    {
      enunciado: "Padre José Pedro se destaca por qual postura diante dos meninos?",
      alternativaA: "Reprovar o grupo sem tentar compreender sua realidade",
      alternativaB: "Acolher os meninos com empatia",
      alternativaC: "Liderar os assaltos do trapiche",
      alternativaD: "Encaminhá-los para um internato militar",
      alternativaE: "Ignorar a situação de abandono",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "O padre tenta compreender os meninos e oferecer ajuda genuína.",
    },
    {
      enunciado: "Volta Seca admira qual figura histórica?",
      alternativaA: "Antônio Conselheiro",
      alternativaB: "Lampião",
      alternativaC: "Zumbi dos Palmares",
      alternativaD: "Tiradentes",
      alternativaE: "Getúlio Vargas",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "Volta Seca idealiza Lampião e o cangaço como destino de liberdade.",
    },
    {
      enunciado: "Professor é lembrado principalmente por qual traço?",
      alternativaA: "Força física extraordinária",
      alternativaB: "Talento artístico e sensibilidade",
      alternativaC: "Prática religiosa constante",
      alternativaD: "Habilidade política nas ruas",
      alternativaE: "Vida de luxo fora do grupo",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao:
        "João José, o Professor, é o intelectual e desenhista do grupo.",
    },
    {
      enunciado: "João Grande se caracteriza por quê?",
      alternativaA: "Força física e proteção ao grupo",
      alternativaB: "Poder financeiro e influência política",
      alternativaC: "Talento musical refinado",
      alternativaD: "Prática de esportes em clubes da elite",
      alternativaE: "Alto desempenho escolar formal",
      gabarito: "A",
      dificuldade: "FACIL",
      comentarioResolucao:
        "João Grande se destaca pela força e pela função de proteção entre os meninos.",
    },
    {
      enunciado: "O trapiche funciona na narrativa como o quê?",
      alternativaA: "Palácio da elite baiana",
      alternativaB: "Escola oficial de Salvador",
      alternativaC: "Quartel da polícia",
      alternativaD: "Abrigo precário e ponto de encontro do grupo",
      alternativaE: "Mercado de luxo à beira-mar",
      gabarito: "D",
      dificuldade: "FACIL",
      comentarioResolucao:
        "O trapiche é o espaço de moradia, reunião e conflito dos meninos.",
    },
    {
      enunciado: "Salvador, no romance, representa principalmente o quê?",
      alternativaA: "Uma cidade sem desigualdade social",
      alternativaB: "Um espaço de forte desigualdade urbana",
      alternativaC: "Uma capital industrializada do Sul",
      alternativaD: "Um centro científico do interior",
      alternativaE: "Uma cidade isolada do litoral",
      gabarito: "B",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "A cidade aparece como cenário de exclusão, pobreza e contraste social.",
    },
    {
      enunciado: "Os furtos do grupo podem ser lidos como o quê?",
      alternativaA: "Um hobby sem relação com a sobrevivência",
      alternativaB: "Uma forma de enriquecer a elite",
      alternativaC: "Estratégia de sobrevivência diante da exclusão",
      alternativaD: "Uma tradição escolar ensinada pelos padres",
      alternativaE: "Uma competição esportiva entre bairros",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "Os roubos aparecem como resposta à fome, ao abandono e à falta de proteção social.",
    },
    {
      enunciado: "A linguagem de Jorge Amado na obra é caracterizada por quê?",
      alternativaA: "Formal, rebuscada e distante da fala popular",
      alternativaB: "Simples, direta e próxima da oralidade",
      alternativaC: "Exclusivamente científica",
      alternativaD: "Totalmente em latim",
      alternativaE: "Baseada em documentos jurídicos",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao:
        "O autor aproxima a narrativa da fala cotidiana e do universo popular.",
    },
    {
      enunciado: "O romance é associado à segunda fase do Modernismo porque faz o quê?",
      alternativaA: "Defende o academicismo clássico",
      alternativaB: "Evita temas sociais",
      alternativaC: "Valoriza apenas mitos europeus",
      alternativaD: "Une crítica social e regionalismo",
      alternativaE: "Rompe com a narrativa em prosa",
      gabarito: "D",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "A obra regionalista traz denúncia social e atenção ao cotidiano brasileiro.",
    },
    {
      enunciado: "A ausência de figuras familiares na história evidencia o quê?",
      alternativaA: "Segurança emocional dos meninos",
      alternativaB: "Vulnerabilidade e abandono",
      alternativaC: "Excesso de privilégios",
      alternativaD: "Apoio constante do Estado",
      alternativaE: "Uma educação formal estável",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao:
        "O romance destaca a falta de proteção familiar como causa importante da situação dos meninos.",
    },
    {
      enunciado: "A polícia aparece na narrativa principalmente como o quê?",
      alternativaA: "Força de proteção constante",
      alternativaB: "Grupo de apoio pedagógico",
      alternativaC: "Força de repressão",
      alternativaD: "Instituição neutra e distante",
      alternativaE: "Escola de ofícios",
      gabarito: "C",
      dificuldade: "FACIL",
      comentarioResolucao:
        "A relação da polícia com os meninos é marcada por violência e perseguição.",
    },
    {
      enunciado: "A figura de Dora modifica o grupo ao introduzir o quê?",
      alternativaA: "Afetividade e cuidado",
      alternativaB: "Mais violência e crueldade",
      alternativaC: "Punição religiosa",
      alternativaD: "Riqueza material",
      alternativaE: "Distanciamento absoluto",
      gabarito: "A",
      dificuldade: "FACIL",
      comentarioResolucao:
        "Dora amplia a dimensão afetiva da história e humaniza o cotidiano do grupo.",
    },
    {
      enunciado: "O título Capitães da Areia sugere o quê?",
      alternativaA: "Um exército formal da cidade",
      alternativaB: "Uma ordem religiosa secreta",
      alternativaC: "Uma companhia de teatro",
      alternativaD: "A liderança dos meninos sobre o território do trapiche e das ruas",
      alternativaE: "Um clube esportivo infantil",
      gabarito: "D",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "O nome remete ao modo como os meninos ocupam e dominam simbolicamente o espaço em que vivem.",
    },
    {
      enunciado: "A obra acompanha principalmente quais personagens?",
      alternativaA: "Burgueses ricos de Salvador",
      alternativaB: "Crianças marginalizadas que vivem de pequenos furtos",
      alternativaC: "Políticos da capital baiana",
      alternativaD: "Trabalhadores de fábrica do Sul",
      alternativaE: "Fazendeiros do interior paulista",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao:
        "O foco narrativo está nos meninos em situação de abandono e exclusão social.",
    },
    {
      enunciado: "O desfecho de alguns personagens indica o quê?",
      alternativaA: "Uma única vida de luxo para todos",
      alternativaB: "O fim completo do grupo sem exceção",
      alternativaC: "Trajetórias diferentes e possibilidade de reinserção",
      alternativaD: "A fuga de todos para outro país",
      alternativaE: "A formação de um governo infantil",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "A obra aponta caminhos distintos para os meninos, alguns ligados à arte, ao trabalho ou à militância.",
    },
    {
      enunciado: "O romance combina realismo e qual outra dimensão?",
      alternativaA: "Sensibilidade poética",
      alternativaB: "Fantasia medieval",
      alternativaC: "Terror sobrenatural",
      alternativaD: "Narrativa policial científica",
      alternativaE: "Cômico pastelão",
      gabarito: "A",
      dificuldade: "DIFICIL",
      comentarioResolucao:
        "A obra denuncia problemas sociais sem perder a força literária e humana da escrita.",
    },
    {
      enunciado: "O trapiche é importante porque o quê?",
      alternativaA: "É a sede da prefeitura",
      alternativaB: "Concentra encontros e conflitos do grupo",
      alternativaC: "É o colégio dos meninos ricos",
      alternativaD: "É um hospital público",
      alternativaE: "É o palácio do governador",
      gabarito: "B",
      dificuldade: "FACIL",
      comentarioResolucao:
        "Esse espaço concentra a convivência cotidiana dos meninos e suas tensões.",
    },
    {
      enunciado: "A relação entre infância e violência na obra denuncia o quê?",
      alternativaA: "A força da disciplina escolar",
      alternativaB: "A eficiência do sistema prisional",
      alternativaC: "A falha do Estado e da sociedade",
      alternativaD: "O sucesso da elite baiana",
      alternativaE: "A neutralidade da cidade",
      gabarito: "C",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "A obra mostra que a violência contra crianças é resultado de abandono estrutural.",
    },
    {
      enunciado: "Pedro Bala evolui de qual condição ao longo da narrativa?",
      alternativaA: "De líder marginal para consciência social",
      alternativaB: "De juiz para policial",
      alternativaC: "De comerciante para fazendeiro",
      alternativaD: "De padre para professor",
      alternativaE: "De menino rico para político",
      gabarito: "A",
      dificuldade: "MEDIA",
      comentarioResolucao:
        "Pedro Bala passa a enxergar a dimensão social da própria vida e do grupo.",
    },
    {
      enunciado: "A presença da cidade e da imprensa evidencia o quê?",
      alternativaA: "Como os marginalizados são vistos pelos outros",
      alternativaB: "O fim da desigualdade social",
      alternativaC: "A ausência de conflitos urbanos",
      alternativaD: "O foco exclusivo na escola formal",
      alternativaE: "A superioridade do campo sobre o litoral",
      gabarito: "A",
      dificuldade: "DIFICIL",
      comentarioResolucao:
        "A narrativa mostra o olhar externo da sociedade sobre os meninos e sua marginalização.",
    },
    {
      enunciado: "A história se passa sobretudo em qual local?",
      alternativaA: "Recife, Pernambuco",
      alternativaB: "São Paulo, capital",
      alternativaC: "Salvador, Bahia",
      alternativaD: "Porto Alegre, Rio Grande do Sul",
      alternativaE: "Brasília, Distrito Federal",
      gabarito: "C",
      dificuldade: "FACIL",
      comentarioResolucao:
        "O romance é ambientado em Salvador, que funciona como cenário central da trama.",
    },
  ];

  const questoes = Array.from({ length: 100 }, (_, indice) => {
    const base = bancoQuestoes[indice % bancoQuestoes.length];

    return {
      simuladoId: simulado.id,
      enunciado: `${base.enunciado} (Questão ${indice + 1})`,
      alternativaA: base.alternativaA,
      alternativaB: base.alternativaB,
      alternativaC: base.alternativaC,
      alternativaD: base.alternativaD,
      alternativaE: base.alternativaE,
      gabarito: base.gabarito,
      dificuldade: base.dificuldade,
      comentarioResolucao: base.comentarioResolucao,
    };
  });

  await prisma.questao.createMany({
    data: questoes,
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
