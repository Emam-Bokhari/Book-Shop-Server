import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { SupportValidationSchema } from './support.validation';
import { SupportControllers } from './support.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequestSchema(SupportValidationSchema.createSupportValidationSchema),
  SupportControllers.createSupportController,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  SupportControllers.getAllSupportsController,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin),
  SupportControllers.getSupportController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  SupportControllers.deleteSupportController,
);

export const SupportRoutes = router;
