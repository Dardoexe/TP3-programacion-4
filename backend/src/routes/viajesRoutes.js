import { Router } from 'express';
import { obtenerViajes, crearViaje } from '../controllers/viajeController.js';
import { viajeValidation } from '../validators/viajeValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidation.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', obtenerViajes);
router.post('/', viajeValidation, handleValidationErrors, crearViaje);

export default router;