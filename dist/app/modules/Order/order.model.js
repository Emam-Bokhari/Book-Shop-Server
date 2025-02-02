"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const shippingAddressDetailsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
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
    products: [
        new mongoose_1.Schema({
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        }, { _id: false }),
    ],
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    totalAmount: {
        type: Number,
    },
    paymentMethod: {
        type: String,
        trim: true,
        default: 'sslCommerz',
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
    // shippingAddress: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'ShippingAddress',
    // },
    shippingAddressDetails: {
        type: shippingAddressDetailsSchema,
        required: true,
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
