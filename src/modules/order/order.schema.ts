import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import validator from "validator";


const createOrderSchema = z.object({
    itemId: z.string({ required_error: ' Item id is required' }).trim()
        .min(5, { message: 'Item id should have between 5 and 36 chracters.' })
        .max(36, { message: 'Item id should have between 5 and 36 chracters.' })
        .refine(val => validator.matches(val, /^[A-Za-z0-9]+$/), { message: 'Invalid item id' }),


    amount: z.number({ invalid_type_error: 'Amount is required and must be of type number' })
        .min(1, { message: 'Amount cannot be less than one(1)' })
        .max(90000000000000, { message: 'Maximum amount exceeded.' })
});



export type CreateOrderType = z.infer<typeof createOrderSchema>

export const { schemas: orderSchema, $ref } = buildJsonSchemas({
    createOrderSchema,
}, { $id: "orderSchema" });