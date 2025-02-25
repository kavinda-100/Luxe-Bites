import { z } from "zod";

export const zodUserSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z
    .string({
      message: "Email is required",
    })
    .email({ message: "Invalid email" }),
  role: z.enum(["ADMIN", "USER"], { message: "Invalid role" }).default("USER"),
});
