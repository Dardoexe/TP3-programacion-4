import { body } from 'express-validator';

export const registerValidation = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.'),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('Debe ingresar un correo electrónico válido.'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

export const loginValidation = [
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('Debe ingresar un correo electrónico válido.'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
];