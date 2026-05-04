import prisma from '../lib/services/prismaClient.js';

export default class QuizModel {
    constructor({
        id = null,
        livroId = null,
        titulo = null,
        descricao = null,
        idioma = 'PT_BR',
        tempoLimiteMin = null,
        ativo = true,
    } = {}) {
        this.id = id;
        this.livroId = livroId;
        this.titulo = titulo;
        this.descricao = descricao;
        this.idioma = idioma;
        this.tempoLimiteMin = tempoLimiteMin;
        this.ativo = ativo;
    }

    async criar() {
        return prisma.quiz.create({
            data: {
                livroId: this.livroId,
                titulo: this.titulo,
                descricao: this.descricao,
                idioma: this.idioma,
                tempoLimiteMin: this.tempoLimiteMin,
                ativo: this.ativo,
            },
        });
    }

    async atualizar() {
        return prisma.quiz.update({
            where: { id: this.id },
            data: {
                livroId: this.livroId,
                titulo: this.titulo,
                descricao: this.descricao,
                idioma: this.idioma,
                tempoLimiteMin: this.tempoLimiteMin,
                ativo: this.ativo,
            },
        });
    }

    async deletar() {
        return prisma.quiz.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.livroId) {
            where.livroId = parseInt(filtros.livroId, 10);
        }
        if (filtros.idioma) {
            where.idioma = filtros.idioma;
        }
        if (filtros.ativo !== undefined) {
            where.ativo = filtros.ativo === 'true' || filtros.ativo === true;
        }

        return prisma.quiz.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.quiz.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new QuizModel(data);
    }

    static async buscarPorLivro(livroId) {
        const data = await prisma.quiz.findMany({ where: { livroId } });
        return data.map(item => new QuizModel(item));
    }
}
