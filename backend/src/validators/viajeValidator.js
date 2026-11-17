import { body } from 'express-validator';

export const viajeValidation = [
    body('vehiculo_id').notEmpty().withMessage('El vehículo es obligatorio.'),
    body('conductor_id').notEmpty().withMessage('El conductor es obligatorio.'),
    body('fecha_salida').notEmpty().withMessage('La fecha de salida es obligatoria.'),
    body('fecha_llegada').notEmpty().withMessage('La fecha de llegada es obligatoria.'),
    body('origen').trim().notEmpty().withMessage('El origen es obligatorio.'),
    body('destino').trim().notEmpty().withMessage('El destino es obligatorio.'),
    body('kilometros').notEmpty().withMessage('Los kilómetros son obligatorios.')
];