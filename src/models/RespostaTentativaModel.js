import prisma from '../lib/services/prismaClient.js';

export default class RespostaTentativaModel {
    constructor({
        id = null,
        tentativaId,
        questaoId,
        respostaMarcada = null,
        correta = null,
        respondidoEm = null,
    } = {}) {
        this.id = id;
        this.tentativaId = tentativaId;
        this.questaoId = questaoId;
        this.respostaMarcada = respostaMarcada;
        this.correta = correta;
        this.respondidoEm = respondidoEm;
    }

    async criar() {
        return prisma.respostaTentativa.create({
            data: {
                tentativaId: this.tentativaId,
                questaoId: this.questaoId,
                respostaMarcada: this.respostaMarcada,
                correta: this.correta,
                respondidoEm: this.respondidoEm ? new Date(this.respondidoEm) : undefined,
            },
        });
    }

    async atualizar() {
        return prisma.respostaTentativa.update({
            where: { id: this.id },
            data: {
                tentativaId: this.tentativaId,
                questaoId: this.questaoId,
                respostaMarcada: this.respostaMarcada,
                correta: this.correta,
                respondidoEm: this.respondidoEm ? new Date(this.respondidoEm) : undefined,
            },
        });
    }

    async deletar() {
        return prisma.respostaTentativa.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.tentativaId !== undefined) {
            where.tentativaId = parseInt(filtros.tentativaId, 10);
        }
        if (filtros.questaoId !== undefined) {
            where.questaoId = parseInt(filtros.questaoId, 10);
        }
        if (filtros.respostaMarcada) {
            where.respostaMarcada = filtros.respostaMarcada;
        }
        if (filtros.correta !== undefined) {
            where.correta = String(filtros.correta) === 'true';
        }

        return prisma.respostaTentativa.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.respostaTentativa.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new RespostaTentativaModel(data);
    }
}
