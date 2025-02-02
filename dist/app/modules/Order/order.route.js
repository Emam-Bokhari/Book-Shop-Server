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
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequestSchema_1.validateRequestSchema)(order_validation_1.OrderValidationSchema.createOrderValidationSchema), order_controller_1.OrderControllers.createOrderController);
router.get('/order-history/:email', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.getUserOrdersHistoryController);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.getAllOrdersController);
router.get('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.getOrderController);
router.patch('/:id/status', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.updateOrderStatusController);
exports.OrderRoutes = router;
