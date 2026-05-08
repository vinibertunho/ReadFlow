import express from 'express';
import 'dotenv/config';
import livrosRoutes from './routes/livroRoute.js';
import personagemRoutes from './routes/personagemRoute.js';
import usuarioRoutes from './routes/usuarioRoute.js';
import quizRoutes from './routes/quizRoute.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/livro', livrosRoutes);
app.use('/api/personagem', personagemRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
