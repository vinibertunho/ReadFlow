import prisma from '../lib/services/prismaClient.js';

function validarDescricao(descricao, idioma) {
    if (!descricao || String(descricao).trim().length === 0) {
        throw new Error(`A descrição em ${idioma} é obrigatória.`);
    }

    return String(descricao).trim();
}

export default class SobreProjetoModel {
    constructor({
        id = null,
        descricao_pt = null,
        descricao_en = null,
    } = {}) {

        this.id = id;
        this.descricao_pt = descricao_pt;
        this.descricao_en = descricao_en;
    }

    validar() {
        this.descricao_pt = validarDescricao(this.descricao_pt, 'português');
        this.descricao_en = validarDescricao(this.descricao_en, 'inglês');
    }

    async criar() {
        this.validar();

        return prisma.sobreProjeto.create({
            data: {
                descricao_pt: this.descricao_pt,
                descricao_en: this.descricao_en,
            },
        });
    }

    async atualizar() {
        this.validar();

        return prisma.sobreProjeto.update({
            where: {
                id: this.id,
            },
            data: {
                descricao_pt: this.descricao_pt,
                descricao_en: this.descricao_en,
            },
        });
    }

    async deletar() {
        return prisma.sobreProjeto.delete({
            where: {
                id: this.id,
            },
        });
    }

    static async buscarTodos() {
        return prisma.sobreProjeto.findMany();
    }

    static async buscarPorId(id) {
        const data = await prisma.sobreProjeto.findUnique({
            where: {
                id,
            },
        });

        if (!data) {
            return null;
        }

        return new SobreProjetoModel(data);
    }
}
