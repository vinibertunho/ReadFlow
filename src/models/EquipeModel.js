import prisma from '../lib/services/prismaClient.js';

export default class EquipeModel {
    constructor({
        id = null,
        nome,
        descricao = null,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }

    async criar() {
        return prisma.equipe.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
            },
        });
    }

    async atualizar() {
        return prisma.equipe.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                descricao: this.descricao,
            },
        });
    }

    async deletar() {
        return prisma.equipe.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        return prisma.equipe.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.equipe.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new EquipeModel(data);
    }
}
