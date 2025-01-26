"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(order_validation_1.OrderValidationSchema.createOrderValidationSchema), order_controller_1.OrderControllers.createOrderController);
router.get('/', order_controller_1.OrderControllers.getAllOrdersController);
router.get('/:id', order_controller_1.OrderControllers.getOrderController);
router.patch('/:id/status', order_controller_1.OrderControllers.updateOrderStatusController);
exports.OrderRoutes = router;
