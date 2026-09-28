import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Please enter a valid email"),

  age: z
    .number()
    .min(1, "Age must be at least 1")
    .max(120, "Age must be below 120")
    .optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
