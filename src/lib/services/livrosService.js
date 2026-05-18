import 'dotenv/config';

const BASE_URL = 'https://bookverse-back-pob5.onrender.com/livros';
const API_KEY = process.env.BOOKVERSE_API_KEY;

export const buscarLivrosExternos = async () => {
    if (typeof fetch === 'undefined') {
        try {
            const mod = await import('node-fetch');
            global.fetch = mod.default;
            console.info('Fallback: carregado node-fetch como global.fetch');
        } catch (e) {
            console.error('fetch não disponível e falha ao importar node-fetch:', e);
            throw new Error('Fetch API não disponível no ambiente Node e node-fetch não pôde ser importado. Instale node-fetch ou atualize para Node >=18.');
        }
    }

    if (!API_KEY) {
        console.error('BOOKVERSE_API_KEY não encontrada em process.env');
        throw new Error('Variavel BOOKVERSE_API_KEY nao configurada no .env.');
    }
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            console.error(`Erro ao consultar API externa: status=${response.status} body=${errorText}`);

            throw new Error(
                `Falha ao consultar a API externa. Status ${response.status}. ${errorText}`.trim(),
            );
        }

        return response.json();
    } catch (err) {
        console.error('Exceção ao buscar livros externos:', err.message || err);
        throw err;
    }
};
