import { z } from "zod";

export const addProductValidationSchema = z.object({
  body: z.object({
    name: z.string().max(50),
    category: z.string(),
    quantity: z.number(),
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
    quantity: z.number().optional(),
    brand: z.string().optional(),
    rating: z.number().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const productValidation = {
  addProductValidationSchema,
  updateProductValidationSchema,
};
