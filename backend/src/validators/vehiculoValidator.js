import { body } from 'express-validator';

export const vehiculoValidation = [
    body('dominio')
        .trim()
        .notEmpty().withMessage('El dominio es obligatorio.'),
    body('marca')
        .trim()
        .notEmpty().withMessage('La marca es obligatoria.'),
    body('modelo')
        .trim()
        .notEmpty().withMessage('El modelo es obligatorio.')
];