import { z } from "zod";
export const schema = z.object({
  product_name: z.string(),
  description: z.string(),
  price: z.number(),
  rent_price: z.number(),
  rent_option: z.string(),
  product_category: z.array(z.string()),
});
