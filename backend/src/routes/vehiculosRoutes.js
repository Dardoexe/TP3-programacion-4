import { Router } from 'express';
import { getVehiculos, createVehiculo } from '../controllers/vehiculoController.js';
import { vehiculoValidation } from '../validators/vehiculoValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidation.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', getVehiculos);
router.post('/', vehiculoValidation, handleValidationErrors, createVehiculo);

export default router;