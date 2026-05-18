import prisma from '../lib/services/prismaClient.js';

function validarNome(nome) {
    if (!nome || String(nome).trim().length === 0) {
        throw new Error('O nome do personagem é obrigatório.');
    }

    return String(nome).trim();
}

function validarLivroId(livroId) {
    if (!livroId) {
        throw new Error('O livroId é obrigatório.');
    }

    return parseInt(livroId, 10);
}

export default class PersonagemModel {
    constructor({
        id = null,
        livroId = null,
        nome = null,
        descricao = null,
    } = {}) {
        this.id = id;
        this.livroId = livroId;
        this.nome = nome;
        this.descricao = descricao;
    }

    validar() {
        this.livroId = validarLivroId(this.livroId);
        this.nome = validarNome(this.nome);
    }

    async criar() {
        this.validar();

        return prisma.personagem.create({
            data: {
                livroId: this.livroId,
                nome: this.nome,
                descricao: this.descricao,
            },
        });
    }

    async atualizar() {
        this.validar();

        return prisma.personagem.update({
            where: {
                id: this.id,
            },
            data: {
                livroId: this.livroId,
                nome: this.nome,
                descricao: this.descricao,
            },
        });
    }

    async deletar() {
        return prisma.personagem.delete({
            where: {
                id: this.id,
            },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.livroId !== undefined) {
            where.livroId = parseInt(filtros.livroId, 10);
        }

        if (filtros.nome) {
            where.nome = {
                contains: filtros.nome,
                mode: 'insensitive',
            };
        }

        return prisma.personagem.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.personagem.findUnique({
            where: {
                id,
            },
        });

        if (!data) {
            return null;
        }

        return new PersonagemModel(data);
    }
}