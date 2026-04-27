import prisma from '../lib/services/prismaClient.js';

export default class EquipeMembroModel {
    constructor({
        id = null,
        equipeId,
        usuarioId,
        funcao,
    } = {}) {
        this.id = id;
        this.equipeId = equipeId;
        this.usuarioId = usuarioId;
        this.funcao = funcao;
    }

    async criar() {
        return prisma.equipeMembro.create({
            data: {
                equipeId: this.equipeId,
                usuarioId: this.usuarioId,
                funcao: this.funcao,
            },
        });
    }

    async atualizar() {
        return prisma.equipeMembro.update({
            where: { id: this.id },
            data: {
                equipeId: this.equipeId,
                usuarioId: this.usuarioId,
                funcao: this.funcao,
            },
        });
    }

    async deletar() {
        return prisma.equipeMembro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.equipeId !== undefined) {
            where.equipeId = parseInt(filtros.equipeId, 10);
        }
        if (filtros.usuarioId !== undefined) {
            where.usuarioId = parseInt(filtros.usuarioId, 10);
        }
        if (filtros.funcao) {
            where.funcao = { contains: filtros.funcao, mode: 'insensitive' };
        }

        return prisma.equipeMembro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.equipeMembro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new EquipeMembroModel(data);
    }
}
