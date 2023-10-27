import fastify from "fastify";
import { UserInterface } from './src/utils/interface';

declare module 'fastify' {
    export interface FastifyRequest {
        user: UserInterface,
        accessToken?: string
    }
}