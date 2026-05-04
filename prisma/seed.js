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

  console.log("📚 Inserindo livro, personagens, curiosidades e quiz...");

  const livro = await prisma.livro.create({
    data: {
      titulo: "Capitães da Areia",
      autor: "Jorge Amado",
      anoPublicacao: 1937,
      genero_pt: "Romance",
      genero_en: "Novel",
      descricao_pt:
        "A obra retrata a vida de um grupo de menores abandonados que vivem nas ruas de Salvador.",
      descricao_en:
        "The work portrays the lives of abandoned children living on the streets of Salvador.",
      capaUrl: "https://ibb.co/6R0jzHXy.jpg",
      usuarioId: editor.id,
    },
  });

  await prisma.personagem.createMany({
    data: [
      { livroId: livro.id, nome: "Pedro Bala", descricao: "Líder do grupo Capitães da Areia." },
      { livroId: livro.id, nome: "Dora", descricao: "Única figura feminina do bando." },
      { livroId: livro.id, nome: "Professor", descricao: "O intelectual do grupo." },
    ],
  });

  await prisma.curiosidade.createMany({
    data: [
      {
        livroId: livro.id,
        titulo: "Contexto histórico",
        texto: "O romance foi escrito no contexto da década de 1930, com críticas sociais fortes.",
        autorUsuarioId: conteudista.id,
        publicado: true,
      },
      {
        livroId: livro.id,
        titulo: "Adaptações",
        texto: "A obra já recebeu diversas adaptações para teatro e cinema.",
        autorUsuarioId: conteudista.id,
        publicado: true,
      },
    ],
  });

  const quiz = await prisma.quiz.create({
    data: {
      livroId: livro.id,
      titulo: "Quiz: Capitães da Areia",
      descricao: "Questões rápidas sobre personagens e enredo",
      idioma: "PT_BR",
      tempoLimiteMin: 20,
    },
  });

  console.log("📝 Gerando as questões...");

  // Criamos a variável bancoQuestoes com todas as perguntas que você tinha soltas no código
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
      comentarioResolucao: "Pedro Bala é o líder indiscutível.",
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
      comentarioResolucao: "Dora atua como figura materna do bando.",
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
      comentarioResolucao: "O livro escancara a realidade de menores abandonados.",
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
      comentarioResolucao: "A cidade aparece como cenário de exclusão, pobreza e contraste social.",
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
      comentarioResolucao: "Os roubos aparecem como resposta à fome, ao abandono e à falta de proteção social.",
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
      comentarioResolucao: "O autor aproxima a narrativa da fala cotidiana e do universo popular.",
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
      comentarioResolucao: "O romance destaca a falta de proteção familiar como causa importante da situação dos meninos.",
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
      comentarioResolucao: "A relação da polícia com os meninos é marcada por violência e perseguição.",
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
      comentarioResolucao: "O nome remete ao modo como os meninos ocupam e dominam simbolicamente o espaço em que vivem.",
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
      comentarioResolucao: "A obra aponta caminhos distintos para os meninos, alguns ligados à arte, ao trabalho ou à militância.",
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
      comentarioResolucao: "Esse espaço concentra a convivência cotidiana dos meninos e suas tensões.",
    }
  ];

  const questoes = Array.from({ length: 100 }, (_, indice) => {
    const base = bancoQuestoes[indice % bancoQuestoes.length];

    return {
      quizId: quiz.id, // Corrigido de simuladoId para quizId
      enunciado: `${base.enunciado} (Questão ${indice + 1})`,
      alternativaA: base.alternativaA,
      alternativaB: base.alternativaB,
      alternativaC: base.alternativaC,
      alternativaD: base.alternativaD,
      alternativaE: base.alternativaE,
      gabarito: base.gabarito,
      dificuldade: base.dificuldade,
      comentarioResolucao: base.comentarioResolucao || "Sem comentário.",
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
    await pool.end();
  });