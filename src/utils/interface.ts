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

export interface ProtectedRequest extends FastifyRequest {
    user?: UserInterface;
    accessToken?: string;
}