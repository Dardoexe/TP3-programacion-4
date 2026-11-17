import pool from '../config/db.js';

export const obtenerViajes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM viajes');
        res.json(rows);
    } catch (error) {
        console.error('Error en GET /viajes:', error);
        res.status(500).json({ error: 'Error al obtener los viajes.' });
    }
};

export const crearViaje = async (req, res) => {
    const { 
        vehiculo_id, 
        conductor_id, 
        fecha_salida, 
        fecha_llegada, 
        origen, 
        destino, 
        kilometros, 
        observaciones 
    } = req.body;
    
    try {
        const [result] = await pool.query(
            `INSERT INTO viajes 
            (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                vehiculo_id, 
                conductor_id, 
                fecha_salida, 
                fecha_llegada, 
                origen, 
                destino, 
                kilometros || 0, 
                observaciones || ''
            ]
        );
        res.status(201).json({
            id: result.insertId,
            vehiculo_id,
            conductor_id,
            fecha_salida,
            fecha_llegada,
            origen,
            destino,
            kilometros,
            observaciones
        });
    } catch (error) {
        console.error('Error detallado en POST /viajes:', error);
        res.status(500).json({ error: error.message || 'Error al registrar el viaje.' });
    }
};