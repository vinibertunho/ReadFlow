import prisma from '../lib/services/prismaClient.js';

export default class QuestaoModel {
    constructor({
        id = null,
        simuladoId,
        enunciado,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        alternativaE = null,
        gabarito,
        dificuldade = 'MEDIA',
        comentarioResolucao = null,
    } = {}) {
        this.id = id;
        this.simuladoId = simuladoId;
        this.enunciado = enunciado;
        this.alternativaA = alternativaA;
        this.alternativaB = alternativaB;
        this.alternativaC = alternativaC;
        this.alternativaD = alternativaD;
        this.alternativaE = alternativaE;
        this.gabarito = gabarito;
        this.dificuldade = dificuldade;
        this.comentarioResolucao = comentarioResolucao;
    }

    async criar() {
        return prisma.questao.create({
            data: {
                simuladoId: this.simuladoId,
                enunciado: this.enunciado,
                alternativaA: this.alternativaA,
                alternativaB: this.alternativaB,
                alternativaC: this.alternativaC,
                alternativaD: this.alternativaD,
                alternativaE: this.alternativaE,
                gabarito: this.gabarito,
                dificuldade: this.dificuldade,
                comentarioResolucao: this.comentarioResolucao,
            },
        });
    }

    async atualizar() {
        return prisma.questao.update({
            where: { id: this.id },
            data: {
                simuladoId: this.simuladoId,
                enunciado: this.enunciado,
                alternativaA: this.alternativaA,
                alternativaB: this.alternativaB,
                alternativaC: this.alternativaC,
                alternativaD: this.alternativaD,
                alternativaE: this.alternativaE,
                gabarito: this.gabarito,
                dificuldade: this.dificuldade,
                comentarioResolucao: this.comentarioResolucao,
            },
        });
    }

    async deletar() {
        return prisma.questao.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.simuladoId !== undefined) {
            where.simuladoId = parseInt(filtros.simuladoId, 10);
        }
        if (filtros.gabarito) {
            where.gabarito = filtros.gabarito;
        }
        if (filtros.dificuldade) {
            where.dificuldade = filtros.dificuldade;
        }

        return prisma.questao.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.questao.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new QuestaoModel(data);
    }
}
