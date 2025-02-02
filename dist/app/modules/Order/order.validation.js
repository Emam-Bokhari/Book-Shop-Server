"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
const createShippingAddressDetailsValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim(),
    phone: zod_1.z.string().trim(),
    address: zod_1.z.string().trim().max(200, 'Address can not exceed 200 characters'),
    postalCode: zod_1.z.string().trim(),
    city: zod_1.z.string().trim().max(100, 'City can not exceed 100 characters'),
    country: zod_1.z.string().trim().max(100, 'Country can not exceed 100 characters'),
});
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        products: zod_1.z.array(zod_1.z.object({ productId: zod_1.z.string(), quantity: zod_1.z.number().int() })),
        // quantity: z.number().int(),
        totalAmount: zod_1.z.number().optional(),
        paymentMethod: zod_1.z.string().default('sslCommerz'),
        paymentStatus: zod_1.z
            .enum(['pending', 'completed', 'failed', 'canceled'])
            .default('pending'),
        // shippingAddress: z.string().optional(),
        shippingAddressDetails: createShippingAddressDetailsValidationSchema,
        status: zod_1.z.enum(['pending', 'shipping', 'delivered']).default('pending'),
        orderDate: zod_1.z.string().optional(),
        transactionId: zod_1.z.string().optional(),
    }),
});
exports.OrderValidationSchema = {
    createOrderValidationSchema,
};
