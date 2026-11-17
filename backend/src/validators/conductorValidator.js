import { body } from 'express-validator';

export const conductorValidation = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio.'),
    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio.'),
    body('dni')
        .trim()
        .notEmpty().withMessage('El DNI es obligatorio.'),
    body('licencia')
        .trim()
        .notEmpty().withMessage('La licencia es obligatoria.')
];