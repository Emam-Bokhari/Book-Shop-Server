import { z } from 'zod';

const createShippingAddressValidationSchema = z.object({
  body: z.object({
    name: z.enum(['home', 'office', 'other']),
    phone: z.string().trim(),
    address: z
      .string()
      .trim()
      .max(200, 'Address can not exceed 200 characters'),
    postalCode: z.string().trim(),
    city: z.string().trim().max(100, 'City can not exceed 100 characters'),
    country: z
      .string()
      .trim()
      .max(100, 'Country can not exceed 100 characters'),
  }),
});

const updateShippingAddressValidationSchema = z.object({
  body: z.object({
    name: z.enum(['home', 'office', 'other']).optional(),
    phone: z.string().trim().optional(),
    address: z
      .string()
      .trim()
      .max(200, 'Address can not exceed 200 characters')
      .optional(),
    postalCode: z.string().trim().optional(),
    city: z
      .string()
      .trim()
      .max(100, 'City can not exceed 100 characters')
      .optional(),
    country: z
      .string()
      .trim()
      .max(100, 'Country can not exceed 100 characters')
      .optional(),
  }),
});

export const ShippingAddressValidationSchema = {
  createShippingAddressValidationSchema,
  updateShippingAddressValidationSchema,
};
