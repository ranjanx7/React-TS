import { z } from "zod";

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

const baseUserSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(MIN_NAME_LENGTH, `Full name must be at least ${MIN_NAME_LENGTH} characters`),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  country: z.string().min(1, "Please select a country"),
  termsAccepted: z
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

// Create mode: password is required
export const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must contain at least ${MIN_PASSWORD_LENGTH} characters`,
    )
    .regex(/\d/, "Password must contain at least one number"),
});

// Edit mode: password is disabled and not validated
export const updateUserSchema = baseUserSchema.extend({
  password: z.string().optional(),
});

export type UserFormData = z.infer<typeof createUserSchema>;
