import { z } from "zod";

export const AdvertisementSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  active: z.boolean().default(true),
  link: z.string(),
});
