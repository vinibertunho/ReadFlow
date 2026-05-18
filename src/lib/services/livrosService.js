import 'dotenv/config';

const BASE_URL = 'https://bookverse-back-pob5.onrender.com/livros';
const API_KEY = process.env.BOOKVERSE_API_KEY;

export const buscarLivrosExternos = async () => {
    if (!API_KEY) {
        throw new Error('Variavel BOOKVERSE_API_KEY nao configurada no .env.');
    }

    const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '');

        throw new Error(
            `Falha ao consultar a API externa. Status ${response.status}. ${errorText}`.trim(),
        );
    }

    return response.json();
};
