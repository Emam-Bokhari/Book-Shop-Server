import express from "express";
import { ShippingAddressControllers } from "./shippingAddress.controller";

const router = express.Router();

router.post("/", ShippingAddressControllers.createShippingAddressController)

export const ShippingAddressRoutes = router;