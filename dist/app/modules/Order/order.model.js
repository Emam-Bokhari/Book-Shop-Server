"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const shippingAddressDetailsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: ['home', 'office', 'other'],
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,
    },
});
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['sslCommerz', 'cashOnDelivery'],
            message: '{VALUE} is not a valid payment method',
        },
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: {
            values: ['pending', 'completed', 'failed', 'canceled'],
            message: '{VALUE} is not a valid payment status',
        },
        default: 'pending',
    },
    shippingAddress: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ShippingAddress',
    },
    shippingAddressDetails: {
        type: shippingAddressDetailsSchema,
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'shipping', 'delivered'],
            message: '{VALUE} is not a valid status',
        },
        default: 'pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    transactionId: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
