"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().max(50, 'User name can not exceed 50 characters'),
        email: zod_1.z.string().trim().email(),
        password: zod_1.z
            .string()
            .trim(),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
        status: zod_1.z.enum(['active', 'banned']).default('active'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .max(50, 'User name can not exceed 50 characters')
            .optional(),
        email: zod_1.z.string().trim().email().optional(),
        password: zod_1.z
            .string()
            .trim()
            .optional(),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
        status: zod_1.z.enum(['active', 'banned']).default('active'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.UserValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
