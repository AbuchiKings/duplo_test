import { FastifyReply, FastifyRequest } from "fastify";

type Role = "OWNER" | "HEAD"

export interface UserInterface {
    id: string;
    name?: string;
    password?: string
    role: Role
    email?: string
    department: string | null
    businessId?: string
    createdAt?: Date;
    updatedAt?: Date;
}


export interface OrderInterface {
    id: String
    amount: number
    itemId: String
    businessId: String
    createdBy: String
    createdAt: Date
}