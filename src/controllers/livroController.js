import LivroModel from "../models/LivroModel.js";

export const criar = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Corpo da requisição vazio. Envie os dados!" });
    }

    const { titulo, autor, anoPublicacao, sinopse, capaUrl, usuarioId } =
      req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
    }
    if (!autor) {
      return res.status(400).json({ error: 'O campo "autor" é obrigatório!' });
    }

    const livro = new LivroModel({
      titulo,
      autor,
      anoPublicacao: anoPublicacao ? parseInt(anoPublicacao, 10) : null,
      sinopse: sinopse ?? null,
      capaUrl: capaUrl ?? null,
      usuarioId: usuarioId ? parseInt(usuarioId, 10) : null,
    });

    const data = await livro.criar();

    return res.status(201).json({ message: "Livro criado com sucesso!", data });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    return res.status(500).json({ error: "Erro interno ao salvar o livro." });
  }
};

export const buscarTodos = async (req, res) => {
  try {
    const registros = await LivroModel.buscarTodos(req.query);

    if (!registros || registros.length === 0) {
      return res.status(200).json({ message: "Nenhum registro encontrado." });
    }

    return res.status(200).json(registros);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return res.status(500).json({ error: "Erro ao buscar livros." });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID enviado não é um número válido." });
    }

    const livro = await LivroModel.buscarPorId(parseInt(id, 10));

    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    return res.status(200).json({ data: livro });
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    return res.status(500).json({ error: "Erro ao buscar livro." });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Corpo da requisição vazio. Envie os dados!" });
    }

    const livro = await LivroModel.buscarPorId(parseInt(id, 10));

    if (!livro) {
      return res
        .status(404)
        .json({ error: "Livro não encontrado para atualizar." });
    }

    if (req.body.titulo !== undefined) {
      livro.titulo = req.body.titulo;
    }
    if (req.body.autor !== undefined) {
      livro.autor = req.body.autor;
    }
    if (req.body.anoPublicacao !== undefined) {
      livro.anoPublicacao = req.body.anoPublicacao
        ? parseInt(req.body.anoPublicacao, 10)
        : null;
    }
    if (req.body.sinopse !== undefined) {
      livro.sinopse = req.body.sinopse;
    }
    if (req.body.capaUrl !== undefined) {
      livro.capaUrl = req.body.capaUrl;
    }
    if (req.body.usuarioId !== undefined) {
      livro.usuarioId = req.body.usuarioId
        ? parseInt(req.body.usuarioId, 10)
        : null;
    }

    const data = await livro.atualizar();

    return res
      .status(200)
      .json({
        message: `O livro "${data.titulo}" foi atualizado com sucesso!`,
        data,
      });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return res.status(500).json({ error: "Erro ao atualizar livro." });
  }
};

export const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const livro = await LivroModel.buscarPorId(parseInt(id, 10));

    if (!livro) {
      return res
        .status(404)
        .json({ error: "Livro não encontrado para deletar." });
    }

    await livro.deletar();

    return res
      .status(200)
      .json({
        message: `O livro "${livro.titulo}" foi deletado com sucesso!`,
        deletado: livro,
      });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return res.status(500).json({ error: "Erro ao deletar livro." });
  }
};
