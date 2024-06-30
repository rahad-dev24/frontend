import { z } from "zod";
export const schema = z
  .object({
    first_name: z.string().min(1, { message: "Please enter your first name" }),
    last_name: z.string().min(1, { message: "Please enter your last name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().min(1, { message: "Please enter your phone number" }),
    address: z.string().min(1, { message: "Please enter your address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "passwords do not match",
    path: ["confirm_password"],
  });
