import { Router } from 'express';
import { registrar, login } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validators/authValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidation.js';

const router = Router();

router.post('/register', registerValidation, handleValidationErrors, registrar);
router.post('/login', loginValidation, handleValidationErrors, login);

export default router;