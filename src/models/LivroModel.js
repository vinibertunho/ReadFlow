import prisma from '../lib/services/prismaClient.js';

const DIFICULDADES_VALIDAS = new Set(['FACIL', 'MEDIA', 'DIFICIL']);

function validarAnoPublicacao(ano) {
    if (!ano) return true;
    
    const anoNum = parseInt(ano, 10);
    const anoAtual = new Date().getFullYear();
    
    if (isNaN(anoNum) || anoNum < 1000 || anoNum > anoAtual) {
        throw new Error(`O ano de publicação deve ser entre 1000 e ${anoAtual}.`);
    }
    
    return true;
}

function validarUrl(url) {
    if (!url) return true;
    
    try {
        new URL(url);
        return true;
    } catch {
        throw new Error('URL inválida fornecida.');
    }
}

export default class LivroModel {
    constructor({
        id = null,
        titulo = null,
        autor = null,
        anoPublicacao = null,
        sinopse = null,
        detalhes_autor_pt = null,
        detalhes_autor_en = null,
        estilo_escrita_pt = null,
        estilo_escrita_en = null,
        verossimilhanca_pt = null,
        verossimilhanca_en = null,
        caracteristicas_literarias_pt = null,
        caracteristicas_literarias_en = null,
        conclusao_pt = null,
        conclusao_en = null,
        video_url = null,
        capa_url = null,
        usuarioId = null,
    } = {}) {
        validarAnoPublicacao(anoPublicacao);
        validarUrl(video_url);
        validarUrl(capa_url);
        
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.sinopse = sinopse;
        this.detalhes_autor_pt = detalhes_autor_pt;
        this.detalhes_autor_en = detalhes_autor_en;
        this.estilo_escrita_pt = estilo_escrita_pt;
        this.estilo_escrita_en = estilo_escrita_en;
        this.verossimilhanca_pt = verossimilhanca_pt;
        this.verossimilhanca_en = verossimilhanca_en;
        this.caracteristicas_literarias_pt = caracteristicas_literarias_pt;
        this.caracteristicas_literarias_en = caracteristicas_literarias_en;
        this.conclusao_pt = conclusao_pt;
        this.conclusao_en = conclusao_en;
        this.video_url = video_url;
        this.capa_url = capa_url;
        this.usuarioId = usuarioId;
    }

    async criar() {
        return prisma.livro.create({
            data: {
                titulo: this.titulo,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                sinopse: this.sinopse,
                detalhes_autor_pt: this.detalhes_autor_pt,
                detalhes_autor_en: this.detalhes_autor_en,
                estilo_escrita_pt: this.estilo_escrita_pt,
                estilo_escrita_en: this.estilo_escrita_en,
                verossimilhanca_pt: this.verossimilhanca_pt,
                verossimilhanca_en: this.verossimilhanca_en,
                caracteristicas_literarias_pt: this.caracteristicas_literarias_pt,
                caracteristicas_literarias_en: this.caracteristicas_literarias_en,
                conclusao_pt: this.conclusao_pt,
                conclusao_en: this.conclusao_en,
                video_url: this.video_url,
                capa_url: this.capa_url,
                usuarioId: this.usuarioId,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                autor: this.autor,
                anoPublicacao: this.anoPublicacao,
                sinopse: this.sinopse,
                detalhes_autor_pt: this.detalhes_autor_pt,
                detalhes_autor_en: this.detalhes_autor_en,
                estilo_escrita_pt: this.estilo_escrita_pt,
                estilo_escrita_en: this.estilo_escrita_en,
                verossimilhanca_pt: this.verossimilhanca_pt,
                verossimilhanca_en: this.verossimilhanca_en,
                caracteristicas_literarias_pt: this.caracteristicas_literarias_pt,
                caracteristicas_literarias_en: this.caracteristicas_literarias_en,
                conclusao_pt: this.conclusao_pt,
                conclusao_en: this.conclusao_en,
                video_url: this.video_url,
                capa_url: this.capa_url,
                usuarioId: this.usuarioId,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.autor) {
            where.autor = { contains: filtros.autor, mode: 'insensitive' };
        }
        if (filtros.anoPublicacao) {
            where.anoPublicacao = parseInt(filtros.anoPublicacao, 10);
        }
        if (filtros.usuarioId) {
            where.usuarioId = parseInt(filtros.usuarioId, 10);
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel(data);
    }
}
