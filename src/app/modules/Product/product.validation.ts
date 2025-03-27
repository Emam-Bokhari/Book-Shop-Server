import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().max(50, 'Title can not exceed 50 characters'),
    category: z.enum([
      'fiction',
      'nonFiction',
      'academic',
      'philosophy',
      'children',
      'science',
      'religion',
      'history',
      "biography",
      "art",
      "poetry",
      "romance",
      "mystery",
      "fantasy",
      "travel",
      "selfHelp",
      "psychology",
      "politics",
      "cookbook",
      "humor",
      "graphicNovels",
      "health",
      "technology",
      "business",
      "education",
      "sports",
    ]),
    author: z.string().trim().max(50, 'Author can not exceed 50 characters'),
    aboutAuthor: z.string().trim(),
    shipping: z.string().trim(),
    returnsPolicy: z.string().trim(),
    termsOfSale: z.string().trim(),
    description: z
      .string()
      .trim()
      .max(1000, 'Description can not exceed 1000 characters'),
    price: z
      .number()
      .int()
      .min(1, 'Price is required and must be price at least 1')
      .max(10000, 'Price can not exceed 10000'),
    images: z.array(z.string()),
    publisher: z
      .string()
      .trim()
      .max(100, 'Publisher can not exceed 100 characters'),
    publishedDate: z.string(),
    edition: z
      .string()
      .trim()
      .max(50, 'Edition can not exceed 50 characters')
      .optional(),
    language: z.enum([
      'bengali',
      'english',
      'arabic',
      'hindi',
      'spanish',
      'french',
      'german',
      "italian", "portuguese", "russian", "chinese", "japanese", "korean", "turkish", "urdu", "swedish", "dutch", "polish", "greek", "hebrew", "persian", "thai", "vietnamese"
    ]),
    pages: z.number().nullable().optional(),
    rating: z
      .number()
      .int()
      .min(1, 'Rating is required and must be at least 1')
      .max(5, 'Rating can not exceed 5'),
    discount: z
      .number()
      .int()
      .min(0, 'Discount cannot be negative')
      .max(100, 'Discount cannot exceed 100')
      .optional(),
    format: z.enum(['hardcover', 'paperback', 'eBook', 'audioBook', "pdf", "audiobookMP3", "audiobookCD", "comicBook", "interactiveBook", "flipBook", "boxSet", "deluxeEdition"]),
    quantity: z
      .number()
      .int()
      .min(0, 'Quantity cannot be negative')
      .max(10000, 'Quantity cannot exceed 10,000'),
    isDeleted: z.boolean().default(false),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .max(50, 'Title can not exceed 50 characters')
      .optional(),
    category: z
      .enum([
        'fiction',
        'nonFiction',
        'academic',
        'philosophy',
        'children',
        'science',
        'religion',
        'history',
        "biography",
        "art",
        "poetry",
        "romance",
        "mystery",
        "fantasy",
        "travel",
        "selfHelp",
        "psychology",
        "politics",
        "cookbook",
        "humor",
        "graphicNovels",
        "health",
        "technology",
        "business",
        "education",
        "sports",
      ])
      .optional(),
    author: z
      .string()
      .trim()
      .max(50, 'Author can not exceed 50 characters')
      .optional(),
    aboutAuthor: z.string().trim().optional(),
    shipping: z.string().trim().optional(),
    returnsPolicy: z.string().trim().optional(),
    termsOfSale: z.string().trim().optional(),
    description: z
      .string()
      .trim()
      .max(1000, 'Description can not exceed 1000 characters')
      .optional(),
    price: z.number().int().max(10000, 'Price can not exceed 10000').optional(),
    images: z.array(z.string()).optional(),
    publisher: z
      .string()
      .trim()
      .max(100, 'Publisher can not exceed 100 characters')
      .optional(),
    publishedDate: z
      .string()
      .regex(
        /^\d{4}\d{2}\d{2}$/,
        'Published date must be in YYYYMMDD format (e.g., 20250125)',
      )
      .optional(),
    edition: z
      .string()
      .trim()
      .max(50, 'Edition can not exceed 50 characters')
      .optional(),
    language: z
      .enum([
        'bengali',
        'english',
        'arabic',
        'hindi',
        'spanish',
        'french',
        'german',
        "italian", "portuguese", "russian", "chinese", "japanese", "korean", "turkish", "urdu", "swedish", "dutch", "polish", "greek", "hebrew", "persian", "thai", "vietnamese"
      ])
      .optional(),
    pages: z.number().nullable().optional(),
    rating: z.number().int().max(5, 'Rating can not exceed 5').optional(),
    discount: z
      .number()
      .int()
      .max(100, 'Discount cannot exceed 100')
      .optional(),
    format: z.enum(['hardcover', 'paperback', 'eBook', 'audioBook', "pdf", "audiobookMP3", "audiobookCD", "comicBook", "interactiveBook", "flipBook", "boxSet", "deluxeEdition"]).optional(),
    quantity: z
      .number()
      .int()
      .max(10000, 'Quantity cannot exceed 10,000')
      .optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const ProductValidationSchema = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
