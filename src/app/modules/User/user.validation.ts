import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().max(50, 'User name can not exceed 50 characters'),
    email: z.string().trim().email(),
    password: z
      .string()
      .trim(),
    role: z.enum(['user', 'admin']).default('user'),
    status: z.enum(['active', 'banned']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .max(50, 'User name can not exceed 50 characters')
      .optional(),
    email: z.string().trim().email().optional(),
    password: z
      .string()
      .trim()
      .optional(),
    role: z.enum(['user', 'admin']).default('user'),
    status: z.enum(['active', 'banned']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});

export const UserValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
