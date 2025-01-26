import express from 'express';
import { OrderControllers } from './order.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { OrderValidationSchema } from './order.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/', validateRequestSchema(OrderValidationSchema.createOrderValidationSchema), OrderControllers.createOrderController);

router.get('/', auth(), OrderControllers.getAllOrdersController);

router.get('/:id', OrderControllers.getOrderController);

router.patch('/:id/status', OrderControllers.updateOrderStatusController);

export const OrderRoutes = router;
