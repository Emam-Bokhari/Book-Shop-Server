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
exports.OrderControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const order_service_1 = require("./order.service");
const mongoose_1 = require("mongoose");
const createOrderController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderPayload = req.body;
    const userEmail = req.user.email;
    const { createdOrder, paymentUrl } = yield order_service_1.OrderServices.createOrder(orderPayload, userEmail);
    const orderData = createdOrder instanceof mongoose_1.Document ? createdOrder.toObject() : createdOrder;
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Order created successfully',
        statusCode: 201,
        data: Object.assign(Object.assign({}, orderData), { paymentUrl }),
    });
}));
const getAllOrdersController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const orders = yield order_service_1.OrderServices.getAllOrders(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Orders retrieved successfully',
        statusCode: 200,
        data: orders,
    });
}));
const getOrderController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = yield order_service_1.OrderServices.getOrderById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Order retrieved successfully',
        statusCode: 200,
        data: order,
    });
}));
const getUserOrdersHistoryController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user.email;
    const userOrders = yield order_service_1.OrderServices.getUserOrdersHistory(userEmail);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User order history retrieved successfully',
        statusCode: 200,
        data: userOrders,
    });
}));
const updateOrderStatusController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    const updatedStatus = yield order_service_1.OrderServices.updateOrderStatusById(id, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Order status updated successfully',
        statusCode: 200,
        data: updatedStatus,
    });
}));
exports.OrderControllers = {
    createOrderController,
    getAllOrdersController,
    getOrderController,
    getUserOrdersHistoryController,
    updateOrderStatusController,
};
