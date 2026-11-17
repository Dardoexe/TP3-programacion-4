import pool from '../config/db.js';

export const getVehiculos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, patente AS dominio, marca, modelo, anio, capacidad_carga FROM vehiculos'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error en GET /vehiculos:', error);
        res.status(500).json({ error: 'Error al obtener los vehículos.' });
    }
};

export const createVehiculo = async (req, res) => {
    const { dominio, marca, modelo, anio, capacidad_carga } = req.body;
    
    const valorAnio = anio || new Date().getFullYear();
    const valorCapacidad = capacidad_carga || 1000; // Valor por defecto si viene vacío

    try {
        const [result] = await pool.query(
            'INSERT INTO vehiculos (patente, marca, modelo, anio, capacidad_carga) VALUES (?, ?, ?, ?, ?)',
            [dominio, marca, modelo || 'Estándar', valorAnio, valorCapacidad]
        );
        res.status(201).json({
            id: result.insertId,
            dominio,
            marca,
            modelo: modelo || 'Estándar',
            anio: valorAnio,
            capacidad_carga: valorCapacidad
        });
    } catch (error) {
        console.error('Error en POST /vehiculos:', error);
        res.status(500).json({ error: error.message || 'Error al registrar el vehículo.' });
    }
};