"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressValidationSchema = void 0;
const zod_1 = require("zod");
const createShippingAddressValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(["home", "office", "other"]),
        phone: zod_1.z.string().trim(),
        address: zod_1.z.string().trim().max(200, "Address can not exceed 200 characters"),
        postalCode: zod_1.z.string().trim(),
        city: zod_1.z.string().trim().max(100, "City can not exceed 100 characters"),
        country: zod_1.z.string().trim().max(100, "Country can not exceed 100 characters")
    })
});
const updateShippingAddressValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(["home", "office", "other"]).optional(),
        phone: zod_1.z.string().trim().optional(),
        address: zod_1.z.string().trim().max(200, "Address can not exceed 200 characters").optional(),
        postalCode: zod_1.z.string().trim().optional(),
        city: zod_1.z.string().trim().max(100, "City can not exceed 100 characters").optional(),
        country: zod_1.z.string().trim().max(100, "Country can not exceed 100 characters").optional(),
    })
});
exports.ShippingAddressValidationSchema = {
    createShippingAddressValidationSchema,
    updateShippingAddressValidationSchema,
};
