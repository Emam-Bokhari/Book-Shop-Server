import { z } from 'zod';

const createContactValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('Invalid email format'),
    message: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

export const ContactValidationSchema = {
  createContactValidationSchema,
};
