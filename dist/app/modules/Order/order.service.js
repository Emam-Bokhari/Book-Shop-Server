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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const HttpError_1 = require("../../errors/HttpError");
const product_model_1 = require("../Product/product.model");
// import { ShippingAddress } from '../ShippingAddress/shippingAddress.model';
const user_model_1 = require("../User/user.model");
const order_model_1 = require("./order.model");
const order_utils_1 = require("./order.utils");
const sslcommerz_service_1 = require("./sslcommerz.service");
const createOrder = (payload, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userEmail);
    if (!user)
        throw new HttpError_1.HttpError(404, 'User not found');
    if (user.status === 'banned')
        throw new HttpError_1.HttpError(403, 'Your account is banned. You cannot perform this action.');
    payload.userId = user._id;
    if (!payload.products || payload.products.length === 0) {
        throw new HttpError_1.HttpError(400, 'At least one product is required.');
    }
    const productIds = payload.products.map((item) => item.productId);
    const products = yield product_model_1.Product.find({ _id: { $in: productIds } });
    if (products.length !== payload.products.length) {
        throw new HttpError_1.HttpError(404, 'One or more products not found.');
    }
    let totalAmount = 0;
    for (const item of payload.products) {
        const product = products.find((p) => p._id.toString() === item.productId.toString());
        if (!product)
            throw new HttpError_1.HttpError(404, `Product with ID ${item.productId} not found.`);
        if (product.quantity <= 0)
            throw new HttpError_1.HttpError(400, `Product "${product.title}" is out of stock.`);
        if (item.quantity > product.quantity) {
            throw new HttpError_1.HttpError(400, `Only ${product.quantity} units of "${product.title}" are available.`);
        }
        totalAmount += product.price * item.quantity;
    }
    payload.totalAmount = totalAmount;
    if (!payload.shippingAddressDetails) {
        throw new HttpError_1.HttpError(400, 'Shipping address is required.');
    }
    const finalShippingAddress = payload.shippingAddressDetails;
    // SSLCommerz Payment Handling
    const transactionId = (0, order_utils_1.generateTransactionId)();
    try {
        const paymentResponse = yield sslcommerz_service_1.SSLCommerzService.initiatePayment({
            total_amount: totalAmount,
            currency: 'USD',
            tran_id: transactionId,
            success_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-success/${transactionId}`,
            fail_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-fail/${transactionId}`,
            cancel_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-cancel/${transactionId}`,
            shipping_method: 'Courier',
            product_name: products.map((p) => p.title).join(', '),
            product_category: products.map((p) => p.category).join(', '),
            product_profile: 'general',
            cus_name: user.name || 'Unknown',
            cus_email: user.email || 'customer@example.com',
            cus_add1: finalShippingAddress.address || '',
            cus_city: finalShippingAddress.city || '',
            cus_postcode: finalShippingAddress.postalCode || '',
            cus_country: finalShippingAddress.country || '',
            cus_phone: finalShippingAddress.phone || '',
            ship_name: user.name || 'Unknown',
            ship_add1: finalShippingAddress.address || '',
            ship_city: finalShippingAddress.city || '',
            ship_postcode: finalShippingAddress.postalCode || '',
            ship_country: finalShippingAddress.country || '',
        });
        payload.transactionId = transactionId;
        const createdOrder = yield order_model_1.Order.create(Object.assign(Object.assign({}, payload), { shippingAddressDetails: finalShippingAddress }));
        // Decrease product quantity
        for (const item of payload.products) {
            yield product_model_1.Product.findOneAndUpdate({ _id: item.productId }, { $inc: { quantity: -item.quantity } });
        }
        return {
            createdOrder,
            paymentUrl: paymentResponse,
        };
    }
    catch (err) {
        throw new HttpError_1.HttpError(500, 'Failed to initiate payment.');
    }
});
const getAllOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate('userId').populate('products.productId'), query)
        .filter()
        .sortBy()
        .paginate();
    const meta = yield orderQuery.countTotal();
    const result = yield orderQuery.modelQuery;
    // const orders = await orderQuery.modelQuery;
    if (result.length === 0) {
        throw new HttpError_1.HttpError(404, 'No order were found in the database');
    }
    return {
        meta,
        result,
    };
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id)
        .populate('userId')
        .populate('products.productId');
    if (!order) {
        throw new HttpError_1.HttpError(404, 'No order found with ID');
    }
    return order;
});
const getUserOrdersHistory = (loggedInUserEmail, requestedUserEmail, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (loggedInUserEmail !== requestedUserEmail) {
        throw new HttpError_1.HttpError(403, 'You are not authorized to view this order history');
    }
    const user = yield user_model_1.User.isUserExists(loggedInUserEmail);
    // check if user is exits
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    // check if user is banned
    if (user.status === 'banned') {
        throw new HttpError_1.HttpError(403, 'Your account has been banned, and access is restricted.');
    }
    const userOrderQuery = new QueryBuilder_1.default(order_model_1.Order.find({ userId: user._id }).populate('userId'), query);
    // const userOrders = await Order.find({ userId: user._id }).populate('userId');
    const meta = yield userOrderQuery.countTotal();
    const result = yield userOrderQuery.modelQuery;
    if (!result || result.length === 0) {
        throw new HttpError_1.HttpError(404, 'No order were found this user');
    }
    return {
        meta,
        result,
    };
});
const updateOrderStatusById = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const validStatuses = ['pending', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
        throw new HttpError_1.HttpError(400, `Invalid status: ${status}`);
    }
    const updatedStatus = yield order_model_1.Order.findOneAndUpdate({ _id: id }, { status: status }, { new: true, runValidators: true });
    if (!updatedStatus) {
        throw new HttpError_1.HttpError(404, 'No order found with ID');
    }
    return updatedStatus;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getOrderById,
    getUserOrdersHistory,
    updateOrderStatusById,
};
