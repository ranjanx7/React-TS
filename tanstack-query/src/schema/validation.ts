import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Please enter a valid email"),

  phone: z.string().regex(/^9\d{9}$/, "Phone must have 10 digits starting 9"),
});

export type UserForm = z.infer<typeof userSchema>;
