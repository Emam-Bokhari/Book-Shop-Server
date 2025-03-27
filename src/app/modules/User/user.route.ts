import express from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsersController);

router.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getMeController,
);

router.get('/:id', auth(USER_ROLE.admin), UserControllers.getUserController);


router.patch(
  '/update-profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateUserController,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.admin),
  UserControllers.updateUserStatusController,
);

router.patch(
  '/:id/role',
  auth(USER_ROLE.admin),
  UserControllers.updateUserRoleController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.deleteUserController,
);

export const UserRoutes = router;
