import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();


router.get('/', UserControllers.getAllUsersController);

router.get('/:id', UserControllers.getUserController);

router.patch('/:id', UserControllers.updateUserController);

router.patch('/:id/status', UserControllers.updateUserStatusController);

router.patch('/:id/role', UserControllers.updateUserRoleController);

router.delete('/:id', UserControllers.deleteUserController);

export const UserRoutes = router;
