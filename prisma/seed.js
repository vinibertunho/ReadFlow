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

  // Conteúdo estruturado do Livro
  const livroData = {
    titulo: "Capitães da Areia",
    autor: "",
    anoPublicacao: null,
    genero_pt: "",
    genero_en: "",
    contexto_pt: "",
    contexto_en: "",
    descricao_pt: "",
    descricao_en: "",
    sinopse: "",
    detalhes_autor_pt: "",
    detalhes_autor_en: "",
    estilo_escrita_pt: "",
    estilo_escrita_en: "",
    verossimilhanca_pt: "",
    verossimilhanca_en: "",
    caracteristicas_literarias_pt: "",
    caracteristicas_literarias_en: "",
    conclusao_pt: "",
    conclusao_en: "",
    video_url: "",
    capa_url: "https://ibb.co/SDKnDwjK.jpeg",
    usuarioId: editor.id,
  };

  const livro = await prisma.livro.create({
    data: livroData,
  });

  await prisma.personagem.createMany({
    data: [
      { livroId: livro.id, nome: "", descricao: "" },
    ],
  });

  await prisma.curiosidade.createMany({
    data: [
      {
        livroId: livro.id,
        titulo: "",
        texto: "",
        autorUsuarioId: conteudista.id,
        publicado: true,
      },
    ],
  });

  const quiz = await prisma.quiz.create({
    data: {
      livroId: livro.id,
      titulo: "",
      descricao: "",
      idioma: "PT_BR",
      tempoLimiteMin: null,
    },
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