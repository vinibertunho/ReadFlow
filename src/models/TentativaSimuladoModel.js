import prisma from '../lib/services/prismaClient.js';

export default class TentativaSimuladoModel {
    constructor({
        id = null,
        simuladoId,
        usuarioId,
        iniciadoEm = null,
        finalizadoEm = null,
        pontuacao = null,
        status = 'EM_ANDAMENTO',
    } = {}) {
        this.id = id;
        this.simuladoId = simuladoId;
        this.usuarioId = usuarioId;
        this.iniciadoEm = iniciadoEm;
        this.finalizadoEm = finalizadoEm;
        this.pontuacao = pontuacao;
        this.status = status;
    }

    async criar() {
        return prisma.tentativaSimulado.create({
            data: {
                simuladoId: this.simuladoId,
                usuarioId: this.usuarioId,
                iniciadoEm: this.iniciadoEm ? new Date(this.iniciadoEm) : undefined,
                finalizadoEm: this.finalizadoEm ? new Date(this.finalizadoEm) : null,
                pontuacao: this.pontuacao,
                status: this.status,
            },
        });
    }

    async atualizar() {
        return prisma.tentativaSimulado.update({
            where: { id: this.id },
            data: {
                simuladoId: this.simuladoId,
                usuarioId: this.usuarioId,
                iniciadoEm: this.iniciadoEm ? new Date(this.iniciadoEm) : undefined,
                finalizadoEm: this.finalizadoEm ? new Date(this.finalizadoEm) : null,
                pontuacao: this.pontuacao,
                status: this.status,
            },
        });
    }

    async deletar() {
        return prisma.tentativaSimulado.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.simuladoId !== undefined) {
            where.simuladoId = parseInt(filtros.simuladoId, 10);
        }
        if (filtros.usuarioId !== undefined) {
            where.usuarioId = parseInt(filtros.usuarioId, 10);
        }
        if (filtros.status) {
            where.status = filtros.status;
        }

        return prisma.tentativaSimulado.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.tentativaSimulado.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new TentativaSimuladoModel(data);
    }
}
