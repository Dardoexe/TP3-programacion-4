import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No autorizado. Falta el token de autenticación.' });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'secreto_super_seguro_utn_tp3';

        // Decodificamos y verificamos el token
        const decoded = jwt.verify(token, secret);

        // Verificamos que el usuario siga existiendo en la BD
        const [rows] = await pool.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [decoded.id]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'No autorizado. Usuario inexistente.' });
        }

        // Adjuntamos el usuario a la petición
        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Sesión inválida o expirada. Por favor vuelva a iniciar sesión.' });
    }
};