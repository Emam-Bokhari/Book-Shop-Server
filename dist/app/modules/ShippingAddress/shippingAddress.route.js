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
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(shippingAddress_validation_1.ShippingAddressValidationSchema.createShippingAddressValidationSchema), shippingAddress_controller_1.ShippingAddressControllers.createShippingAddressController);
router.get('/', shippingAddress_controller_1.ShippingAddressControllers.getAllShippingAddressController);
router.get('/:id', shippingAddress_controller_1.ShippingAddressControllers.getShippingAddressController);
router.patch('/:id', (0, validateRequestSchema_1.validateRequestSchema)(shippingAddress_validation_1.ShippingAddressValidationSchema.updateShippingAddressValidationSchema), shippingAddress_controller_1.ShippingAddressControllers.updatedShippingAddressController);
router.delete('/:id', shippingAddress_controller_1.ShippingAddressControllers.deleteShippingAddressController);
exports.ShippingAddressRoutes = router;
