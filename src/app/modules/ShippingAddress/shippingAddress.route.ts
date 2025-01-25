import express from 'express';
import { ShippingAddressControllers } from './shippingAddress.controller';

const router = express.Router();

router.post('/', ShippingAddressControllers.createShippingAddressController);

router.get("/", ShippingAddressControllers.getAllShippingAddressController);

router.get("/:id", ShippingAddressControllers.getShippingAddressController);

router.patch("/:id", ShippingAddressControllers.updatedShippingAddressController);

router.delete("/:id", ShippingAddressControllers.deleteShippingAddressController);

export const ShippingAddressRoutes = router;
