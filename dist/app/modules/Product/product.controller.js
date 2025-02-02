"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const product_service_1 = require("./product.service");
const createProductController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productPayload = req.body;
    const createdProduct = yield product_service_1.ProductServices.createProduct(productPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Product created successfully',
        statusCode: 201,
        data: createdProduct,
    });
}));
const getAllProductsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield product_service_1.ProductServices.getAllProducts(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Products retrieved successfully',
        statusCode: 200,
        meta: result.meta,
        data: result.result,
    });
}));
const getProductsNoDefaultPaginationController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_service_1.ProductServices.getProductsNoDefaultPagination();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Products retrieved successfully',
        statusCode: 200,
        data: products,
    });
}));
const getProductController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield product_service_1.ProductServices.getProductById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Product retrieved successfully',
        statusCode: 200,
        data: product,
    });
}));
const updateProductController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedProduct = yield product_service_1.ProductServices.updateProductById(id, updatedPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Product updated successfully',
        statusCode: 200,
        data: updatedProduct,
    });
}));
const deleteProductController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield product_service_1.ProductServices.deleteProductById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Product deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.ProductControllers = {
    createProductController,
    getAllProductsController,
    getProductsNoDefaultPaginationController,
    getProductController,
    updateProductController,
    deleteProductController,
};
