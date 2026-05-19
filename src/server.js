import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import livrosRoutes from './routes/livroRoute.js';
import { apiKey } from './lib/middlewares/apiKey.js';
import usuarioRoutes from './routes/usuarioRoute.js';
import personagemRoutes from './routes/personagemRoute.js';
import questaoRoutes from './routes/questaoRoute.js';
import quizRoutes from './routes/quizRoute.js';
import curiosidadeRoutes from './routes/curiosidadeRoute.js';
import equipeRoutes from './routes/equipeRoute.js';
import livrosExternosRoutes from './routes/livrosExternosRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/livros', apiKey, livrosRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/personagens', personagemRoutes);
app.use('/api/questoes', questaoRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/curiosidades', curiosidadeRoutes);
app.use('/api/equipes', equipeRoutes);
app.use('/livrosExternos', livrosExternosRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
