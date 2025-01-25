import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/", OrderControllers.createOrderController);

router.get("/", OrderControllers.getAllOrdersController);

router.get("/:id", OrderControllers.getOrderController);

router.patch("/:id/status", OrderControllers.updateOrderStatusController);

export const OrderRoutes = router;