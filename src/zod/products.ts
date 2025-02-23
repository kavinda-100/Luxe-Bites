import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ message: "Name is required" }),
  description: z.string({ message: "Description is required" }),
  price: z.string({ message: "Price is required" }),
  discount: z.string({ message: "Discount is required" }).optional(),
  stock: z.string({ message: "Stock is required" }),
  image: z.string({ message: "Image is required" }),
  categoryId: z.string({ message: "Category is required" }),
  active: z.boolean().default(true),
});
