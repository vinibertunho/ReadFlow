import prisma from '../lib/services/prismaClient.js';

const NOMES_INTEGRANTES_VALIDOS = new Map([
    ['BEATRIZ_TSUMOTO', 'BEATRIZ_TSUMOTO'],
    ['BEATRIZ TSUMOTO', 'BEATRIZ_TSUMOTO'],
    ['JULIA_DEGRAVA', 'JULIA_DEGRAVA'],
    ['JULIA DEGRAVA', 'JULIA_DEGRAVA'],
    ['ISABELLA_PINESSO', 'ISABELLA_PINESSO'],
    ['ISABELLA PINESSO', 'ISABELLA_PINESSO'],
    ['ANA_BAGGIO', 'ANA_BAGGIO'],
    ['ANA BAGGIO', 'ANA_BAGGIO'],
    ['VINICIUS_BERTUNHO', 'VINICIUS_BERTUNHO'],
    ['VINICIUS BERTUNHO', 'VINICIUS_BERTUNHO'],
    ['MURILO_ROCHA', 'MURILO_ROCHA'],
    ['MURILO ROCHA', 'MURILO_ROCHA'],
]);

function validarNome(nome) {
    if (!nome || String(nome).trim().length === 0) {
        throw new Error('O nome da equipe é obrigatório.');
    }

    return String(nome).trim();
}

function normalizarDescricao(descricao) {
    if (descricao === undefined || descricao === null) {
        return null;
    }

    const valor = String(descricao).trim();
    return valor.length > 0 ? valor : null;
}

function normalizarIntegrante(integrante) {
    const valor = typeof integrante === 'string' ? integrante : integrante?.nome;

    if (!valor) {
        throw new Error('Cada integrante da equipe deve ter um nome válido.');
    }

    const chave = String(valor).trim().toUpperCase().replace(/\s+/g, ' ');
    const nomeNormalizado = NOMES_INTEGRANTES_VALIDOS.get(chave);

    if (!nomeNormalizado) {
        throw new Error(`Integrante inválido: ${valor}.`);
    }

    return { nome: nomeNormalizado };
}

function normalizarIntegrantes(integrantes = []) {
    if (!Array.isArray(integrantes)) {
        throw new Error('O campo "integrantes" deve ser um array.');
    }

    return integrantes.map(normalizarIntegrante);
}

function normalizarUsuariosIds(usuariosIds = []) {
    if (!Array.isArray(usuariosIds)) {
        throw new Error('O campo "usuariosIds" deve ser um array.');
    }

    return usuariosIds
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id));
}

export default class EquipeModel {
    constructor({
        id = null,
        nome = null,
        descricao = null,
        integrantes = [],
        usuariosIds = [],
    } = {}) {
        this.id = id;
        this.nome = validarNome(nome);
        this.descricao = normalizarDescricao(descricao);
        this.integrantes = normalizarIntegrantes(integrantes);
        this.usuariosIds = normalizarUsuariosIds(usuariosIds);
    }

    montarData() {
        const data = {
            nome: this.nome,
            descricao: this.descricao,
        };

        if (this.usuariosIds.length > 0) {
            data.usuarios = {
                connect: this.usuariosIds.map((id) => ({ id })),
            };
        }

        if (this.integrantes.length > 0) {
            data.integrantes = {
                create: this.integrantes,
            };
        }

        return data;
    }

    async criar() {
        return prisma.equipe.create({
            data: this.montarData(),
            include: {
                integrantes: true,
                usuarios: true,
            },
        });
    }

    async atualizar() {
        const data = {
            nome: this.nome,
            descricao: this.descricao,
        };

        if (this.usuariosIds.length > 0) {
            data.usuarios = {
                set: this.usuariosIds.map((id) => ({ id })),
            };
        }

        if (this.integrantes.length > 0) {
            data.integrantes = {
                deleteMany: {},
                create: this.integrantes,
            };
        }

        return prisma.equipe.update({
            where: { id: this.id },
            data,
            include: {
                integrantes: true,
                usuarios: true,
            },
        });
    }

    async deletar() {
        return prisma.equipe.delete({ where: { id: this.id } });
    }

    async salvar() {
        if (this.id) {
            return this.atualizar();
        }

        return this.criar();
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        return prisma.equipe.findMany({
            where,
            include: {
                integrantes: true,
                usuarios: true,
            },
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.equipe.findUnique({
            where: { id: Number(id) },
            include: {
                integrantes: true,
                usuarios: true,
            },
        });

        return data ? new EquipeModel(data) : null;
    }
}