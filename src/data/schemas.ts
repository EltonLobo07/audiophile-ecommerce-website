import { z } from "zod";

export const productSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    shortName: z.string(),
    category: z.string(),
    new: z.boolean(),
    price: z.number(),
    description: z.string(),
    features: z.string(),
    includes: z.array(z.object({
        quantity: z.number(),
        item: z.string()
    })),
    others: z.array(z.object({
        slug: z.string(),
        name: z.string(),
        category: z.string()
    }))
});

export const schemas = {
    products: z.array(productSchema) 
};
