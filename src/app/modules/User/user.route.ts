import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { UserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(UserValidationSchema.createUserValidationSchema),
  UserControllers.createUserController,
);

router.get('/', UserControllers.getAllUsersController);

router.get('/:id', UserControllers.getUserController);

router.patch('/:id', UserControllers.updateUserController);

router.patch('/:id/status', UserControllers.updateUserStatusController);

router.patch("/:id/role", UserControllers.updateUserRoleController)

router.delete('/:id', UserControllers.deleteUserController);

export const UserRoutes = router;
