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
const config_1 = __importDefault(require("../../config"));
const HttpError_1 = require("../../errors/HttpError");
const product_model_1 = require("../Product/product.model");
const shippingAddress_model_1 = require("../ShippingAddress/shippingAddress.model");
const user_model_1 = require("../User/user.model");
const order_model_1 = require("./order.model");
const order_utils_1 = require("./order.utils");
const sslcommerz_service_1 = require("./sslcommerz.service");
const createOrder = (payload, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userEmail);
    // check if user is exists
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    // check is user is banned
    if (user.status === 'banned') {
        throw new HttpError_1.HttpError(403, 'Your account is banned. You cannot perform this action.');
    }
    // set user id
    payload.userId = user._id;
    const product = yield product_model_1.Product.findOne({ _id: payload.product });
    // check if product is exists
    if (!product) {
        throw new HttpError_1.HttpError(404, 'No product found with ID');
    }
    // check if product is available
    if (product.quantity <= 0) {
        throw new HttpError_1.HttpError(400, 'Product is currently unavailable. Please check back later or choose another product.');
    }
    if (payload.quantity > product.quantity) {
        throw new HttpError_1.HttpError(400, `Only ${product.quantity} units of this product are available. Please update your order quantity`);
    }
    // total amount of product
    const totalAmount = product.price * payload.quantity;
    payload.totalAmount = totalAmount;
    // handle shipping address
    let finalShippingAddress = null;
    if (!payload.shippingAddress && !payload.shippingAddressDetails) {
        throw new HttpError_1.HttpError(400, 'Shipping address is required.');
    }
    if (payload.shippingAddress) {
        // check if default shipping address
        const defaultShippingAddress = yield shippingAddress_model_1.ShippingAddress.findOne({
            _id: payload.shippingAddress,
        });
        if (!defaultShippingAddress) {
            throw new HttpError_1.HttpError(404, 'No default shipping address found with ID');
        }
        finalShippingAddress = {
            name: defaultShippingAddress.name,
            phone: defaultShippingAddress.phone,
            address: defaultShippingAddress.address,
            postalCode: defaultShippingAddress.postalCode,
            city: defaultShippingAddress.city,
            country: defaultShippingAddress.country,
        };
    }
    else if (payload.shippingAddressDetails) {
        finalShippingAddress = payload.shippingAddressDetails;
    }
    // payment method integration
    // if payment method is sslCommerz, initiate the payment
    if (payload.paymentMethod === 'sslCommerz') {
        const transactionId = (0, order_utils_1.generateTransactionId)();
        try {
            const paymentResponse = yield sslcommerz_service_1.SSLCommerzService.initiatePayment({
                total_amount: totalAmount,
                currency: 'BDT',
                tran_id: transactionId,
                success_url: config_1.default.success_url || '',
                fail_url: config_1.default.fail_url || '',
                cancel_url: config_1.default.cancel_url || '',
                shipping_method: 'Courier',
                product_name: product.title || '',
                product_category: product.category || '',
                product_profile: 'general',
                cus_name: user.name || 'Unknown',
                cus_email: user.email || 'customer@example.com',
                cus_add1: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.address) || '',
                cus_city: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.city) || '',
                cus_postcode: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.postalCode) || '',
                cus_country: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.country) || '',
                cus_phone: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.phone) || '',
                ship_name: user.name || 'Unknown',
                ship_add1: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.address) || '',
                ship_city: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.city) || '',
                ship_postcode: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.postalCode) || '',
                ship_country: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.country) || '',
            });
            payload.transactionId = transactionId;
            const createdOrder = yield order_model_1.Order.create(Object.assign(Object.assign({}, payload), { shippingAddressDetails: finalShippingAddress }));
            // decrease product quantity after creating the order
            yield product_model_1.Product.findOneAndUpdate({ _id: payload.product }, { $inc: { quantity: -payload.quantity } });
            return {
                createdOrder,
                paymentUrl: paymentResponse,
            };
        }
        catch (err) {
            throw new HttpError_1.HttpError(500, 'Failed to initiate payment.');
        }
    }
    // create the order
    const createdOrder = yield order_model_1.Order.create(Object.assign(Object.assign({}, payload), { shippingAddressDetails: finalShippingAddress }));
    // decrease product quantity after creating the order
    yield product_model_1.Product.findOneAndUpdate({ _id: payload.product }, { $inc: { quantity: -payload.quantity } });
    return { createdOrder, paymentUrl: '' };
});
const getAllOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate('userId'), query)
        .filter()
        .sortBy()
        .paginate();
    const orders = yield orderQuery.modelQuery;
    if (orders.length === 0) {
        throw new HttpError_1.HttpError(404, 'No order were found in the database');
    }
    return orders;
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id).populate('userId');
    if (!order) {
        throw new HttpError_1.HttpError(404, 'No order found with ID');
    }
    return order;
});
const getUserOrdersHistory = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userEmail);
    // check if user is exits
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    // check if user is banned
    if (user.status === 'banned') {
        throw new HttpError_1.HttpError(403, 'Your account has been banned, and access is restricted.');
    }
    const userOrders = yield order_model_1.Order.find({ userId: user._id }).populate('userId');
    if (!userOrders || userOrders.length === 0) {
        throw new HttpError_1.HttpError(404, 'No order were found this user');
    }
    return userOrders;
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
