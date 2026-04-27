import prisma from '../lib/services/prismaClient.js';

const IDIOMAS_VALIDOS = new Set(['PT_BR', 'EN']);

function normalizarIdioma(idioma) {
    if (!idioma) {
        return 'PT_BR';
    }

    const valor = String(idioma).trim().toUpperCase().replace(/-/g, '_');

    if (IDIOMAS_VALIDOS.has(valor)) {
        return valor;
    }

    if (['PT', 'PTBR', 'PORTUGUES', 'PORTUGUÊS', 'PORTUGUESE'].includes(valor)) {
        return 'PT_BR';
    }

    if (['EN', 'ENG', 'INGLES', 'INGLÊS', 'ENGLISH'].includes(valor)) {
        return 'EN';
    }

    throw new Error('O campo "idioma" deve ser português ou inglês.');
}

export default class SimuladoModel {
    constructor({
        id = null,
        livroId = null,
        titulo,
        idioma = 'PT_BR',
        tempoLimiteMin = null,
        ativo = true,
    } = {}) {
        this.id = id;
        this.livroId = livroId;
        this.titulo = titulo;
        this.idioma = normalizarIdioma(idioma);
        this.tempoLimiteMin = tempoLimiteMin;
        this.ativo = ativo;
    }

    async salvar() {
        const dados = {
            livroId: this.livroId ? Number(this.livroId) : null,
            titulo: this.titulo,
            idioma: normalizarIdioma(this.idioma),
            tempoLimiteMin: this.tempoLimiteMin ? Number(this.tempoLimiteMin) : null,
            ativo: String(this.ativo) === 'true',
        };

        this.idioma = dados.idioma;

        if (this.id) {
            return prisma.simulado.update({ where: { id: this.id }, data: dados });
        }

        return prisma.simulado.create({ data: dados });
    }

    static async buscarComQuestoes(id) {
        return prisma.simulado.findUnique({
            where: { id: Number(id) },
            include: {
                questoes: true,
            },
        });
    }
}
