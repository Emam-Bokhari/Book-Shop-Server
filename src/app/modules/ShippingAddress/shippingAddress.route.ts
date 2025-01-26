import express from 'express';
import { ShippingAddressControllers } from './shippingAddress.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { ShippingAddressValidationSchema } from './shippingAddress.validation';

const router = express.Router();

router.post('/', validateRequestSchema(ShippingAddressValidationSchema.createShippingAddressValidationSchema), ShippingAddressControllers.createShippingAddressController);

router.get('/', ShippingAddressControllers.getAllShippingAddressController);

router.get('/:id', ShippingAddressControllers.getShippingAddressController);

router.patch(
  '/:id', validateRequestSchema(ShippingAddressValidationSchema.updateShippingAddressValidationSchema),
  ShippingAddressControllers.updatedShippingAddressController,
);

router.delete(
  '/:id',
  ShippingAddressControllers.deleteShippingAddressController,
);

export const ShippingAddressRoutes = router;
