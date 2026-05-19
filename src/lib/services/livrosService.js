import prisma from "./prismaClient.js";

const EXTERNAL_API_KEY = process.env.BOOKVERSE_API_KEY;
const EXTERNAL_API_URL = process.env.BOOKVERSE_API_URL || "https://bookverse-back-pob5.onrender.com/livros";

async function fazerRequisicaoExterna(url) {
  if (!EXTERNAL_API_KEY) {
    throw new Error(
      "A variável de ambiente BOOKVERSE_API_KEY não foi definida no Render.",
    );
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${EXTERNAL_API_KEY}`,
      "x-api-key": EXTERNAL_API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Erro na API externa: ${response.status} ${response.statusText}${responseText ? ` - ${responseText}` : ""}`,
    );
  }

  return response.json();
}

export async function buscarLivrosExternos() {
  try {
    return await fazerRequisicaoExterna(EXTERNAL_API_URL);
  } catch (error) {
    console.error("Erro ao buscar livros externos:", error.message);
    throw error;
  }
}

export const bookService = {
  async buscarLivroExterno(bookId) {
    try {
      return await fazerRequisicaoExterna(`${EXTERNAL_API_URL}/${bookId}`);
    } catch (error) {
      console.error("Erro ao buscar livro na API externa:", error.message);
      throw error;
    }
  },

  async salvarLivroNoBanco(dadosLivroExterno, usuarioId = null) {
    try {
      const novoLivro = await prisma.livro.create({
        data: {
          titulo: dadosLivroExterno.title || "Título Desconhecido",
          autor: dadosLivroExterno.author || "Autor Desconhecido",
          anoPublicacao: dadosLivroExterno.publishedYear || null,
          sinopse: dadosLivroExterno.synopsis || null,

          genero_pt: dadosLivroExterno.genrePt || "Geral",
          genero_en: dadosLivroExterno.genreEn || "General",

          contexto_historico_pt: dadosLivroExterno.historicalContextPt || null,
          contexto_historico_en: dadosLivroExterno.historicalContextEn || null,
          simbolismo_pt: dadosLivroExterno.symbolismPt || null,
          simbolismo_en: dadosLivroExterno.symbolismEn || null,
          engajamento_pt: dadosLivroExterno.engagementPt || null,
          engajamento_en: dadosLivroExterno.engagementEn || null,
          temas_chave_pt: dadosLivroExterno.keyThemesPt || null,
          temas_chave_en: dadosLivroExterno.keyThemesEn || null,

          capa_url: dadosLivroExterno.coverUrl || null,
          usuarioId: usuarioId,
        },
      });

      return novoLivro;
    } catch (error) {
      console.error("Erro ao salvar livro no banco de dados:", error);
      throw error;
    }
  },
};
