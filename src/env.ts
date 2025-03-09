import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  KINDE_CLIENT_ID: z
    .string({ message: "KINDE_CLIENT_ID is required" })
    .min(1, { message: "KINDE_CLIENT_ID is required" }),
  KINDE_CLIENT_SECRET: z
    .string({ message: "KINDE_CLIENT_SECRET is required" })
    .min(1, { message: "KINDE_CLIENT_SECRET is required" }),
  KINDE_ISSUER_URL: z
    .string({ message: "KINDE_ISSUER_URL is required" })
    .url({ message: "KINDE_ISSUER_URL is not a valid URL" }),
  KINDE_SITE_URL: z
    .string({ message: "KINDE_SITE_URL is required" })
    .url({ message: "KINDE_SITE_URL is not a valid URL" }),
  KINDE_POST_LOGOUT_REDIRECT_URL: z
    .string({ message: "KINDE_POST_LOGOUT_REDIRECT_URL is required" })
    .url({ message: "KINDE_POST_LOGOUT_REDIRECT_URL is not a valid URL" }),
  KINDE_POST_LOGIN_REDIRECT_URL: z
    .string({ message: "KINDE_POST_LOGIN_REDIRECT_URL is required" })
    .url({ message: "KINDE_POST_LOGIN_REDIRECT_URL is not a valid URL" }),
  STRIPE_SECRET_KEY: z.string({ message: "STRIPE_SECRET_KEY is required" }),
  STRIPE_WEBHOOK_SECRET_KEY: z.string({
    message: "STRIPE_WEBHOOK_SECRET_KEY is required",
  }),
  DOMAIN_NAME: z.string().url({ message: "DOMAIN_NAME is not a valid URL" }),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.log(env.error.errors);
  throw new Error("Invalid environment variables");
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export default env;
