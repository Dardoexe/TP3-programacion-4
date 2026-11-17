import { Router } from 'express';
import { getConductores, createConductor } from '../controllers/conductorController.js';
import { conductorValidation } from '../validators/conductorValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidation.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

// Proteger todas las rutas de conductores con JWT
router.use(requireAuth);

router.get('/', getConductores);
router.post('/', conductorValidation, handleValidationErrors, createConductor);

export default router;