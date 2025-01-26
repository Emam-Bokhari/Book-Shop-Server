import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email().trim(),
    password: z.string().trim(),
  }),
});

export const AuthValidationSchema = {
  loginValidationSchema,
};
