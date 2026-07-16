import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const optionalString = z.string().trim().optional().default("");

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DB_HOST: z.string().min(1).default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string().min(1).default("hris"),
  DB_USER: z.string().min(1).default("postgres"),
  DB_PASSWORD: z.string().default(""),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+(s|m|h|d)$/)
    .default("1d"),
  DB_SSL: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  SMTP_HOST: optionalString,
  SMTP_PORT: z.coerce.number().int().positive().optional().default(587),
  SMTP_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  SMTP_USERNAME: optionalString,
  SMTP_PASSWORD: optionalString,
  SMTP_FROM: optionalString,
  APP_URL: z.string().url(),
  EMAIL_VERIFICATION_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

export const env = environmentSchema.parse(process.env);