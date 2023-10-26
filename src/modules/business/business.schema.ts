import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";


const createBusinessSchema = z.object({
    name: z.string({ required_error: ' Name is required' }).trim()
        .min(2, { message: 'Name should have between 2 and 200 chracters.' })
        .max(200, { message: 'Name should have between 2 and 200 chracters.' })
});



export type CreateBusinessType = z.infer<typeof createBusinessSchema>

export const { schemas: businessSchema, $ref } = buildJsonSchemas({
    createBusinessSchema,
}, { $id: "businessSchema" });
