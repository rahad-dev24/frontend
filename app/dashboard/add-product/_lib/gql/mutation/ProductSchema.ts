import { minify } from "next/dist/build/swc";
import { z } from "zod";
export const schema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().gt(0, "Price cannot be zero"),
  rent_price: z.coerce.number().gt(0, "Rent price cannot be zero"),
  rent_option: z.string().min(1, "Rent option is required"),
  product_category: z.array(z.string().min(1, "Product category is required")),
});
