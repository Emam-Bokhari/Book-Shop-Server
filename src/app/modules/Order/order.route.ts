import express from 'express';
import { OrderControllers } from './order.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { OrderValidationSchema } from './order.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(OrderValidationSchema.createOrderValidationSchema),
  OrderControllers.createOrderController,
);

router.get("/order-history", auth(USER_ROLE.user, USER_ROLE.admin), OrderControllers.getUserOrdersHistoryController)

router.get('/', auth(USER_ROLE.admin), OrderControllers.getAllOrdersController);

router.get('/:id', auth(USER_ROLE.admin), OrderControllers.getOrderController);

router.patch('/:id/status', auth(USER_ROLE.admin), OrderControllers.updateOrderStatusController);

export const OrderRoutes = router;
