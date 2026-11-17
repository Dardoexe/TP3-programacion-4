import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { configurePassport } from './src/config/passport.js';

import authRoutes from './src/routes/authRoutes.js';
import vehiculosRoutes from './src/routes/vehiculosRoutes.js';
import conductoresRoutes from './src/routes/conductoresRoutes.js';
import viajesRoutes from './src/routes/viajesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Inicializar Passport
configurePassport(passport);
app.use(passport.initialize());

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/conductores', conductoresRoutes);
app.use('/api/viajes', viajesRoutes);

// Manejo de rutas inexistentes (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});