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
exports.OrderServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const product_model_1 = require("../Product/product.model");
const shippingAddress_model_1 = require("../ShippingAddress/shippingAddress.model");
const order_model_1 = require("./order.model");
const order_utils_1 = require("./order.utils");
const sslcommerz_service_1 = require("./sslcommerz.service");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: check if user is exists
    const product = yield product_model_1.Product.findOne({ _id: payload.product });
    // check if product is exists
    if (!product) {
        throw new HttpError_1.HttpError(404, 'No product found with ID');
    }
    // check if product is available
    if (product.quantity <= 0) {
        throw new HttpError_1.HttpError(400, 'Product is currently unavailable. Please check back later or choose another product.');
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
                success_url: 'https://yourdomain.com/api/payment/success',
                fail_url: 'https://yourdomain.com/api/payment/fail',
                cancel_url: 'https://yourdomain.com/api/payment/cancel',
                shipping_method: 'Courier',
                product_name: product.title || '',
                product_category: product.category || '',
                product_profile: 'general',
                cus_name: 'Customer Name',
                cus_email: 'customer@example.com',
                cus_add1: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.address) || '',
                cus_city: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.city) || '',
                cus_postcode: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.postalCode) || '',
                cus_country: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.country) || '',
                cus_phone: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.phone) || '',
                ship_name: 'Customer Name',
                ship_add1: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.address) || '',
                ship_city: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.city) || '',
                ship_postcode: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.postalCode) || '',
                ship_country: (finalShippingAddress === null || finalShippingAddress === void 0 ? void 0 : finalShippingAddress.country) || '',
            });
            payload.transactionId = transactionId;
            const createdOrder = yield order_model_1.Order.create(Object.assign(Object.assign({}, payload), { shippingAddressDetails: finalShippingAddress, transactionId }));
            createdOrder.paymentStatus = 'completed';
            yield createdOrder.save();
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
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    if (orders.length === 0) {
        throw new HttpError_1.HttpError(404, 'No order were found in the database');
    }
    return orders;
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id);
    if (!order) {
        throw new HttpError_1.HttpError(404, 'No order found with ID');
    }
    return order;
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
    updateOrderStatusById,
};
