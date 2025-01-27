import express from 'express';
import { ShippingAddressControllers } from './shippingAddress.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { ShippingAddressValidationSchema } from './shippingAddress.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(
    ShippingAddressValidationSchema.createShippingAddressValidationSchema,
  ),
  ShippingAddressControllers.createShippingAddressController,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  ShippingAddressControllers.getAllShippingAddressController,
);

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ShippingAddressControllers.getShippingAddressController,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(
    ShippingAddressValidationSchema.updateShippingAddressValidationSchema,
  ),
  ShippingAddressControllers.updatedShippingAddressController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ShippingAddressControllers.deleteShippingAddressController,
);

export const ShippingAddressRoutes = router;
