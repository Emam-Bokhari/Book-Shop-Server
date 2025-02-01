import { z } from 'zod';

const createShippingAddressDetailsValidationSchema = z.object({
  name: z.string().trim(),
  phone: z.string().trim(),
  address: z.string().trim().max(200, 'Address can not exceed 200 characters'),
  postalCode: z.string().trim(),
  city: z.string().trim().max(100, 'City can not exceed 100 characters'),
  country: z.string().trim().max(100, 'Country can not exceed 100 characters'),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    products: z.array(z.object({ productId: z.string(), quantity: z.number().int() })),
    // quantity: z.number().int(),
    totalAmount: z.number().optional(),
    paymentMethod: z.string().default("sslCommerz"),
    paymentStatus: z
      .enum(['pending', 'completed', 'failed', 'canceled'])
      .default('pending'),
    // shippingAddress: z.string().optional(),
    shippingAddressDetails:
      createShippingAddressDetailsValidationSchema,
    status: z.enum(['pending', 'shipping', 'delivered']).default('pending'),
    orderDate: z.string().optional(),
    transactionId: z.string().optional(),
  }),
});

export const OrderValidationSchema = {
  createOrderValidationSchema,
};
