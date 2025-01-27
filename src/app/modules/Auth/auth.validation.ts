import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().max(50, 'User name can not exceed 50 characters'),
    email: z.string().trim().email(),
    password: z.string().trim(),
    role: z.enum(['user', 'admin']).default('user'),
    status: z.enum(['active', 'banned']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});


const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email().trim(),
    password: z.string().trim(),
  }),
});

export const AuthValidationSchema = {
  registerUserValidationSchema,
  loginValidationSchema,
};
