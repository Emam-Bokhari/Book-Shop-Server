import { z } from 'zod';

const createNewsletterValidationSchema = z.object({
    body: z.object({
        email: z.string().email().trim(),
        isDeleted: z.boolean().default(false)
    }),
});

export const NewsletterValidationSchema = {
    createNewsletterValidationSchema,
};