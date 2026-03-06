const express = require('express');

const cors = require('cors');

const dotenv = require('dotenv');

const { connectDB } = require('./config/database');

const technicianRoutes = require('./routes/technicianRoutes');

const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/technicians', technicianRoutes);

app.use('/api/login', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ message: '✅ Servidor rodando com sucesso!' });
});

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📡 API disponível em http://localhost:${PORT}/api/technicians`);
  });
});