import prisma from "./prismaClient.js";

const EXTERNAL_API_KEY = process.env.BOOKVERSE_API_KEY;
const EXTERNAL_API_URL = "https://bookverse-back-pob5.onrender.com/livros";

const RANA_API_KEY = "amods";
const RANA_API_URL = "https://backend-projeto-integrador-rana.onrender.com/api/livro";
const CLUBYX_API_KEY = "Clubyx_dev";
const CLUBYX_API_URL = "https://projeto-clubyx.onrender.com/livros";

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

async function fazerRequisicaoRana(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": RANA_API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Erro na API Rana: ${response.status} ${response.statusText}${responseText ? ` - ${responseText}` : ""}`
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

export async function buscarLivrosRana() {
  try {
    return await fazerRequisicaoRana(RANA_API_URL);
  } catch (error) {
    console.error("Erro ao buscar livros Rana:", error.message);
    throw error;
  }
}

async function fazerRequisicaoClubyx(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": CLUBYX_API_KEY,
      "API_KEY": CLUBYX_API_KEY,
      "Authorization": `Bearer ${CLUBYX_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Erro na API Clubyx: ${response.status} ${response.statusText}${responseText ? ` - ${responseText}` : ""}`
    );
  }

  return response.json();
}

export async function buscarLivrosClubyx() {
  try {
    return await fazerRequisicaoClubyx(CLUBYX_API_URL);
  } catch (error) {
    console.error("Erro ao buscar livros Clubyx:", error.message);
    throw error;
  }
}

export async function buscarLivroClubyxPorId(id) {
  try {
    return await fazerRequisicaoClubyx(`${CLUBYX_API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao buscar livro Clubyx por id:", error.message);
    throw error;
  }
}

export async function buscarLivrosClubyxRaw() {
  try {
    const response = await fetch(CLUBYX_API_URL, {
      method: "GET",
      headers: {
        "x-api-key": CLUBYX_API_KEY,
        "API_KEY": CLUBYX_API_KEY,
        "Authorization": `Bearer ${CLUBYX_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text().catch(() => "");

    return {
      status: response.status,
      statusText: response.statusText,
      body: text,
    };
  } catch (error) {
    console.error('Erro raw Clubyx:', error);
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
          // campos de conteúdo detalhado
          contexto_pt: dadosLivroExterno.contexto_pt || dadosLivroExterno.contextPt || null,
          contexto_en: dadosLivroExterno.contexto_en || dadosLivroExterno.contextEn || null,

          descricao_pt: dadosLivroExterno.descricao_pt || dadosLivroExterno.descriptionPt || null,
          descricao_en: dadosLivroExterno.descricao_en || dadosLivroExterno.descriptionEn || null,

          detalhes_autor_pt: dadosLivroExterno.detalhes_autor_pt || dadosLivroExterno.detailsAuthorPt || null,
          detalhes_autor_en: dadosLivroExterno.detalhes_autor_en || dadosLivroExterno.detailsAuthorEn || null,

          estilo_escrita_pt: dadosLivroExterno.estilo_escrita_pt || dadosLivroExterno.writingStylePt || null,
          estilo_escrita_en: dadosLivroExterno.estilo_escrita_en || dadosLivroExterno.writingStyleEn || null,

          verossimilhanca_pt: dadosLivroExterno.verossimilhanca_pt || dadosLivroExterno.verossimilhancaPt || null,
          verossimilhanca_en: dadosLivroExterno.verossimilhanca_en || dadosLivroExterno.verossimilhancaEn || null,

          caracteristicas_literarias_pt: dadosLivroExterno.caracteristicas_literarias_pt || dadosLivroExterno.characteristicsPt || null,
          caracteristicas_literarias_en: dadosLivroExterno.caracteristicas_literarias_en || dadosLivroExterno.characteristicsEn || null,

          conclusao_pt: dadosLivroExterno.conclusao_pt || dadosLivroExterno.conclusionPt || null,
          conclusao_en: dadosLivroExterno.conclusao_en || dadosLivroExterno.conclusionEn || null,

          contexto_historico_pt: dadosLivroExterno.contexto_historico_pt || dadosLivroExterno.historicalContextPt || null,
          contexto_historico_en: dadosLivroExterno.contexto_historico_en || dadosLivroExterno.historicalContextEn || null,

          simbolismo_pt: dadosLivroExterno.simbolismo_pt || dadosLivroExterno.symbolismPt || null,
          simbolismo_en: dadosLivroExterno.simbolismo_en || dadosLivroExterno.symbolismEn || null,

          engajamento_pt: dadosLivroExterno.engajamento_pt || dadosLivroExterno.engagementPt || null,
          engajamento_en: dadosLivroExterno.engajamento_en || dadosLivroExterno.engagementEn || null,

          temas_chave_pt: dadosLivroExterno.temas_chave_pt || dadosLivroExterno.keyThemesPt || null,
          temas_chave_en: dadosLivroExterno.temas_chave_en || dadosLivroExterno.keyThemesEn || null,

          video_url: dadosLivroExterno.video_url || dadosLivroExterno.videoUrl || null,
          capa_url: dadosLivroExterno.capa_url || dadosLivroExterno.coverUrl || null,
          usuarioId: usuarioId,
        },
      });

      // se o payload contiver personagens, salvar também
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
    } catch (error) {
      console.error("Erro ao salvar livro no banco de dados:", error);
      throw error;
    }
  },
};
