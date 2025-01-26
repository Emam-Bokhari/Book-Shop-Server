"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
const createShippingAddressDetailsValidationSchema = zod_1.z.object({
    name: zod_1.z.enum(["home", "office", "other"]),
    phone: zod_1.z.string().trim(),
    address: zod_1.z.string().trim().max(200, "Address can not exceed 200 characters"),
    postalCode: zod_1.z.string().trim(),
    city: zod_1.z.string().trim().max(100, "City can not exceed 100 characters"),
    country: zod_1.z.string().trim().max(100, "Country can not exceed 100 characters")
});
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        product: zod_1.z.string(),
        quantity: zod_1.z.number().int(),
        totalAmount: zod_1.z.number().optional(),
        paymentMethod: zod_1.z.enum(["sslCommerz", "cashOnDelivery"]),
        paymentStatus: zod_1.z.enum(["pending", "completed", "failed", "canceled"]).default("pending"),
        shippingAddress: zod_1.z.string().optional(),
        shippingAddressDetails: createShippingAddressDetailsValidationSchema.optional(),
        status: zod_1.z.enum(["pending", "shipping", "delivered"]).default("pending"),
        orderDate: zod_1.z.string().optional(),
        transactionId: zod_1.z.string().optional()
    })
});
exports.OrderValidationSchema = {
    createOrderValidationSchema,
};
