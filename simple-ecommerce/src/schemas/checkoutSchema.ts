import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(
      /^(97|98)\d{8}$/,
      "Phone number must be 10 digits and start with 97 or 98",
    ),
  address: z.string().min(3, "Address is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
