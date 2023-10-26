import { buildJsonSchemas } from "fastify-zod";
import validator from 'validator'
import { z } from "zod";

enum Roles {
    HEAD = 'HEAD',
    OWNER = 'OWNER'
}
const createUserSchema = z.object({
    name: z.string({ required_error: ' Name is required' }).trim()
        .min(2, { message: 'Name should have between 2 and 200 chracters.' })
        .max(200, { message: 'Name should have between 2 and 200 chracters.' }),

    email: z.string({ required_error: ' Email is required' }).trim().toLowerCase()
        .min(2, { message: 'Email should have between 2 and 100 chracters.' })
        .max(100, { message: 'Email should have between 2 and 100 chracters.' })
        .email({ message: "Invalid email address" }),

    password: z.string({ required_error: 'Password is required' })
        .min(5, { message: 'Password should have between 5 and 200 chracters.' })
        .max(200, { message: 'Password cannot exceed 200 chracters.' }),
    role: z.nativeEnum(Roles, { invalid_type_error: 'role is required' }).optional(),

    businessId: z.string({ invalid_type_error: 'Business Id is required' })
        .min(25, { message: 'Business Id should have between 20 and 36 chracters.' })
        .max(36, { message: 'Business id  cannot exceed 36 chracters.' })
        .refine(val => validator.matches(val, /^[A-Za-z0-9]+$/), { message: 'Invalid business id' }),

    department: z.string({ invalid_type_error: 'Department is required' }).trim()
        .min(2, { message: 'Department should have between 2 and 100 chracters.' })
        .max(100, { message: 'Department name cannot exceed 100 chracters.' })
});

const loginSchema = z.object({
    email: z.string({ required_error: ' Email is required' }).trim().toLowerCase()
        .min(2, { message: 'Incorrect email or password.' })
        .max(100, { message: 'Incorrect email or password.' })
        .email("Invalid email address."),

    password: z.string({ required_error: 'Password is required' })
        .min(5, { message: 'Invalid email or password.' })
        .max(200, { message: 'Invalid email or password.' }),
});

export type CreateUserType = z.infer<typeof createUserSchema>
export type LoginUserType = z.infer<typeof loginSchema>

export const { schemas: userSchema, $ref } = buildJsonSchemas({
    createUserSchema,
    loginSchema,
}, { $id: "userSchema" });
