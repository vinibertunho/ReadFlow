import express from 'express';
import 'dotenv/config';
import livrosRoutes from './routes/livroRoute.js';
import usuarioRoutes from './routes/usuarioRoute.js';
import personagemRoutes from './routes/personagemRoute.js';
import questaoRoutes from './routes/questaoRoute.js';
import quizRoutes from './routes/quizRoute.js';
import curiosidadeRoutes from './routes/curiosidadeRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/livro', livrosRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/personagem', personagemRoutes);
app.use('/api/questao', questaoRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/curiosidade', curiosidadeRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
