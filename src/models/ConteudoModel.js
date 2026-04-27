import prisma from '../lib/services/prismaClient.js';

export default class ConteudoModel {
    constructor({
        id = null,
        livroId,
        tipo,
        idioma = 'PT_BR',
        titulo,
        texto,
        fonteReferencia = null,
        autorUsuarioId = null,
        publicado = false,
    } = {}) {
        this.id = id;
        this.livroId = livroId;
        this.tipo = tipo;
        this.idioma = idioma;
        this.titulo = titulo;
        this.texto = texto;
        this.fonteReferencia = fonteReferencia;
        this.autorUsuarioId = autorUsuarioId;
        this.publicado = publicado;
    }

    async criar() {
        return prisma.conteudo.create({
            data: {
                livroId: this.livroId,
                tipo: this.tipo,
                idioma: this.idioma,
                titulo: this.titulo,
                texto: this.texto,
                fonteReferencia: this.fonteReferencia,
                autorUsuarioId: this.autorUsuarioId,
                publicado: String(this.publicado) === 'true',
            },
        });
    }

    async atualizar() {
        return prisma.conteudo.update({
            where: { id: this.id },
            data: {
                livroId: this.livroId,
                tipo: this.tipo,
                idioma: this.idioma,
                titulo: this.titulo,
                texto: this.texto,
                fonteReferencia: this.fonteReferencia,
                autorUsuarioId: this.autorUsuarioId,
                publicado: String(this.publicado) === 'true',
            },
        });
    }

    async deletar() {
        return prisma.conteudo.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.livroId !== undefined) {
            where.livroId = parseInt(filtros.livroId, 10);
        }
        if (filtros.tipo) {
            where.tipo = filtros.tipo;
        }
        if (filtros.idioma) {
            where.idioma = filtros.idioma;
        }
        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.publicado !== undefined) {
            where.publicado = String(filtros.publicado) === 'true';
        }
        if (filtros.autorUsuarioId !== undefined) {
            where.autorUsuarioId = parseInt(filtros.autorUsuarioId, 10);
        }

        return prisma.conteudo.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.conteudo.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ConteudoModel(data);
    }
}
