import { z } from "zod";

export const categoriesSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 30, {
      message: "Description must be at least 30 characters.",
    }),
});
