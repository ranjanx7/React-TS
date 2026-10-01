import { z } from "zod";

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(
      MIN_NAME_LENGTH,
      `Name must be at least ${MIN_NAME_LENGTH} characters`,
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must contain at least ${MIN_PASSWORD_LENGTH} characters`,
    )
    .regex(/\d/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
