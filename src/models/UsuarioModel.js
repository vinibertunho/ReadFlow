import prisma from '../lib/services/prismaClient.js';

const IDIOMAS_VALIDOS = new Set(['PT_BR', 'EN']);

function normalizarIdiomaPreferido(idiomaPreferido) {
    if (!idiomaPreferido) {
        return 'PT_BR';
    }

    const valor = String(idiomaPreferido).trim().toUpperCase().replace(/-/g, '_');

    if (IDIOMAS_VALIDOS.has(valor)) {
        return valor;
    }

    if (['PT', 'PTBR', 'PORTUGUES', 'PORTUGUÊS', 'PORTUGUESE'].includes(valor)) {
        return 'PT_BR';
    }

    if (['EN', 'ENG', 'INGLES', 'INGLÊS', 'ENGLISH'].includes(valor)) {
        return 'EN';
    }

    throw new Error('O campo "idiomaPreferido" deve ser português ou inglês.');
}

export default class UsuarioModel {
    constructor({
        id = null,
        nome = null,
        email = null,
        senhaHash = null,
        papel = 'LEITOR',
        idiomaPreferido = 'PT_BR',
        ativo = true,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.papel = papel;
        this.idiomaPreferido = normalizarIdiomaPreferido(idiomaPreferido);
        this.ativo = ativo;
    }

    async criar() {
        const data = {
            nome: this.nome,
            email: this.email,
            senhaHash: this.senhaHash,
            papel: this.papel,
            idiomaPreferido: normalizarIdiomaPreferido(this.idiomaPreferido),
            ativo: this.ativo,
        };

        this.idiomaPreferido = data.idiomaPreferido;

        const novo = await prisma.usuario.create({ data });
        this.id = novo.id;

        return novo;
    }

    async atualizar() {
        return prisma.usuario.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                email: this.email,
                senhaHash: this.senhaHash,
                papel: this.papel,
                idiomaPreferido: normalizarIdiomaPreferido(this.idiomaPreferido),
                ativo: this.ativo,
            },
        });
    }

    async deletar() {
        return prisma.usuario.delete({ where: { id: this.id } });
    }

    async salvar() {
        if (this.id) {
            return this.atualizar();
        }

        return this.criar();
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        if (filtros.nome) where.nome = { contains: filtros.nome, mode: 'insensitive' };
        if (filtros.email) where.email = { contains: filtros.email, mode: 'insensitive' };
        if (filtros.ativo !== undefined) where.ativo = String(filtros.ativo) === 'true';

        return prisma.usuario.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.usuario.findUnique({ where: { id: Number(id) } });
        return data ? new UsuarioModel(data) : null;
    }
}
