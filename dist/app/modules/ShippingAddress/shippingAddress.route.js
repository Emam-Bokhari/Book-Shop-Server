"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const shippingAddress_controller_1 = require("./shippingAddress.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const shippingAddress_validation_1 = require("./shippingAddress.validation");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequestSchema_1.validateRequestSchema)(shippingAddress_validation_1.ShippingAddressValidationSchema.createShippingAddressValidationSchema), shippingAddress_controller_1.ShippingAddressControllers.createShippingAddressController);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), shippingAddress_controller_1.ShippingAddressControllers.getAllShippingAddressController);
router.get('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), shippingAddress_controller_1.ShippingAddressControllers.getShippingAddressController);
router.patch('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequestSchema_1.validateRequestSchema)(shippingAddress_validation_1.ShippingAddressValidationSchema.updateShippingAddressValidationSchema), shippingAddress_controller_1.ShippingAddressControllers.updatedShippingAddressController);
router.delete('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), shippingAddress_controller_1.ShippingAddressControllers.deleteShippingAddressController);
exports.ShippingAddressRoutes = router;
