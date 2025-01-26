"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(product_validation_1.ProductValidationSchema.createProductValidationSchema), product_controller_1.ProductControllers.createProductController);
router.get('/', product_controller_1.ProductControllers.getAllProductsController);
router.get('/:id', product_controller_1.ProductControllers.getProductController);
router.patch('/:id', (0, validateRequestSchema_1.validateRequestSchema)(product_validation_1.ProductValidationSchema.updateProductValidationSchema), product_controller_1.ProductControllers.updateProductController);
router.delete('/:id', product_controller_1.ProductControllers.deleteProductController);
exports.ProductRoutes = router;
