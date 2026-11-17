import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Solicitud incorrecta. Datos inválidos.',
            detalles: errors.array().map(err => ({ campo: err.path, mensaje: err.msg }))
        });
    }
    next();
};