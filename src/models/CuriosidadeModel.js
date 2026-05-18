import prisma from '../lib/services/prismaClient.js';

function validarTitulo(titulo) {
    if (!titulo || String(titulo).trim().length === 0) {
        throw new Error('O título da curiosidade é obrigatório.');
    }

    return String(titulo).trim();
}

function validarTexto(texto) {
    if (!texto || String(texto).trim().length === 0) {
        throw new Error('O texto da curiosidade é obrigatório.');
    }

    return String(texto).trim();
}

function validarLivroId(livroId) {
    if (!livroId) {
        throw new Error('O livroId é obrigatório.');
    }

    return parseInt(livroId, 10);
}

export default class CuriosidadeModel {
    constructor({
        id = null,
        livroId = null,
        titulo = null,
        texto = null,
        autorUsuarioId = null,
        publicado = false,
    } = {}) {

        this.id = id;
        this.livroId = livroId;
        this.titulo = titulo;
        this.texto = texto;
        this.autorUsuarioId = autorUsuarioId;
        this.publicado = publicado;
    }

    validar() {
        this.livroId = validarLivroId(this.livroId);
        this.titulo = validarTitulo(this.titulo);
        this.texto = validarTexto(this.texto);
    }

    async criar() {
        this.validar();

        return prisma.curiosidade.create({
            data: {
                livroId: this.livroId,
                titulo: this.titulo,
                texto: this.texto,
                autorUsuarioId: this.autorUsuarioId,
                publicado: this.publicado,
            },
        });
    }

    async atualizar() {
        this.validar();

        return prisma.curiosidade.update({
            where: {
                id: this.id,
            },
            data: {
                livroId: this.livroId,
                titulo: this.titulo,
                texto: this.texto,
                autorUsuarioId: this.autorUsuarioId,
                publicado: this.publicado,
            },
        });
    }

    async deletar() {
        return prisma.curiosidade.delete({
            where: {
                id: this.id,
            },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = {
                contains: filtros.titulo,
                mode: 'insensitive',
            };
        }

        if (filtros.livroId) {
            where.livroId = parseInt(filtros.livroId, 10);
        }

        if (filtros.publicado !== undefined) {
            where.publicado =
                filtros.publicado === 'true' ||
                filtros.publicado === true;
        }

        if (filtros.autorUsuarioId) {
            where.autorUsuarioId = parseInt(
                filtros.autorUsuarioId,
                10
            );
        }

        return prisma.curiosidade.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.curiosidade.findUnique({
            where: {
                id,
            },
        });

        if (!data) {
            return null;
        }

        return new CuriosidadeModel(data);
    }

    static async buscarPorLivro(livroId) {
        const data = await prisma.curiosidade.findMany({
            where: {
                livroId,
            },
        });

        return data.map(item => new CuriosidadeModel(item));
    }
}