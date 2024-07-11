import { z } from "zod";

export const addProductValidationSchema = z.object({
  body: z.object({
    name: z.string().max(50),
    category: z.string(),
    stockQuantity: z.number(),
    brand: z.string(),
    rating: z.number(),
    description: z.string(),
    price: z.string(),
    image: z.string(),
  }),
});
export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().max(50).optional(),
    category: z.string().optional(),
    stockQuantity: z.number().optional(),
    brand: z.string().optional(),
    rating: z.number().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
    product: z.string().optional(),
  }),
});

export const addProductCartValidationSchema = z.object({
  body: z.object({
    name: z.string().max(50),
    category: z.string(),
    quantity: z.number().default(1),
    brand: z.string(),
    rating: z.number(),
    description: z.string(),
    price: z.string(),
    image: z.string(),
    product: z.string(),
  }),
});

export const productValidation = {
  addProductValidationSchema,
  updateProductValidationSchema,
  addProductCartValidationSchema,
};
