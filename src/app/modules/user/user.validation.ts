import { z } from "zod";

export const addUserValidationSchema = z.object({
  body: z.object({
    name: z.string().max(50),
    email: z.string(),
    phone: z.string(),
    deliveryAddress: z.string(),
  }),
});

export const userValidation = {
  addUserValidationSchema,
};
