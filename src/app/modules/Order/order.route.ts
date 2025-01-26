import express from 'express';
import { OrderControllers } from './order.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { OrderValidationSchema } from './order.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(OrderValidationSchema.createOrderValidationSchema),
  OrderControllers.createOrderController,
);

router.get('/', auth(USER_ROLE.user), OrderControllers.getAllOrdersController);

router.get('/:id', OrderControllers.getOrderController);

router.patch('/:id/status', OrderControllers.updateOrderStatusController);

export const OrderRoutes = router;
