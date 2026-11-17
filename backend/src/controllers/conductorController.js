import pool from '../config/db.js';

export const getConductores = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, nombre, apellido, dni, numero_licencia AS licencia, fecha_alta_licencia, fecha_vencimiento_licencia FROM conductores'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error en GET /conductores:', error);
        res.status(500).json({ error: 'Error al obtener los conductores.' });
    }
};

export const createConductor = async (req, res) => {
    const { nombre, apellido, dni, licencia, fecha_alta_licencia, fecha_vencimiento_licencia } = req.body;

    // Fechas por defecto si no vienen especificadas (Hoy y Hoy + 5 años)
    const hoy = new Date().toISOString().split('T')[0];
    const vencimientoDefecto = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0];

    const alta = fecha_alta_licencia || hoy;
    const vencimiento = fecha_vencimiento_licencia || vencimientoDefecto;

    try {
        const [result] = await pool.query(
            'INSERT INTO conductores (nombre, apellido, dni, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, dni, licencia, alta, vencimiento]
        );
        res.status(201).json({
            id: result.insertId,
            nombre,
            apellido,
            dni,
            licencia,
            fecha_alta_licencia: alta,
            fecha_vencimiento_licencia: vencimiento
        });
    } catch (error) {
        console.error('Error en POST /conductores:', error);
        res.status(500).json({ error: error.message || 'Error al registrar el conductor.' });
    }
};