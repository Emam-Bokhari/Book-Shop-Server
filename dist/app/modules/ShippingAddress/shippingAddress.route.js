"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const shippingAddress_controller_1 = require("./shippingAddress.controller");
const router = express_1.default.Router();
router.post('/', shippingAddress_controller_1.ShippingAddressControllers.createShippingAddressController);
router.get('/', shippingAddress_controller_1.ShippingAddressControllers.getAllShippingAddressController);
router.get('/:id', shippingAddress_controller_1.ShippingAddressControllers.getShippingAddressController);
router.patch('/:id', shippingAddress_controller_1.ShippingAddressControllers.updatedShippingAddressController);
router.delete('/:id', shippingAddress_controller_1.ShippingAddressControllers.deleteShippingAddressController);
exports.ShippingAddressRoutes = router;
