import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidationSchema } from './auth.validation';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';

const router = express.Router();

router.post(
  '/register',
  validateRequestSchema(AuthValidationSchema.registerUserValidationSchema),
  AuthControllers.registerUserController,
);

router.post(
  '/login',
  validateRequestSchema(AuthValidationSchema.loginValidationSchema),
  AuthControllers.loginUserController,
);

export const AuthRoutes = router;
