import prisma from '../lib/services/prismaClient.js';

export default class LivroModel {
    constructor({
        id = null,
        titulo = null,
        autor = null,
        anoPublicacao = null,
        sinopse = null,
        capaUrl = null,
        usuarioId = null,
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.sinopse = sinopse;
        this.capaUrl = capaUrl;
        this.usuarioId = usuarioId;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.titulo,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                sinopse: this.sinopse,
                capaUrl: this.capaUrl,
                usuarioId: this.usuarioId,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                sinopse: this.sinopse,
                capaUrl: this.capaUrl,
                usuarioId: this.usuarioId,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.autor) {
            where.autor = { contains: filtros.autor, mode: 'insensitive' };
        }
        if (filtros.anoPublicacao) {
            where.anoPublicacao = parseInt(filtros.anoPublicacao, 10);
        }
        if (filtros.usuarioId) {
            where.usuarioId = parseInt(filtros.usuarioId, 10);
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel(data);
    }
}
