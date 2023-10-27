import Fastify from "fastify";
import helmet from '@fastify/helmet'
import mongoose, { ConnectOptions } from 'mongoose'

import env from './config'
import errorHandler from "./utils/errorHandler";
import businessRoutes from "./modules/business/business.routes";
import userRoutes from "./modules/user/user.routes";

import { NoEntryError } from "./utils/ApiError";
import { businessSchema } from "./modules/business/business.schema";
import { userSchema } from "./modules/user/user.schema";
import { SuccessMsgResponse } from "./utils/ApiResponse";
import { verifyToken } from "./middlewares/auth";
import orderRoutes from "./modules/order/order.routes";
import { orderSchema } from "./modules/order/order.schema";
import { UserInterface } from '../../auth/src/interfaces/interfaces';

const server = Fastify();

(async function main() {
    try {
        const conn = await mongoose
            .connect(`mongodb://${env.MONGO_DB_ADMIN}:${encodeURIComponent(env.MONGO_DB_ADMIN_PWD)}@mongo:27017/?authSource=admin`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 20,
                minPoolSize: 5,
            } as ConnectOptions)
        console.log(`Connected to ${conn.connections[0].name} Database successfully`);
        server.register(helmet);
        await server.register(import('@fastify/compress'));

        await server.ready();

        const ls = await server.listen({ port: env.PORT, host: '0.0.0.0' });
        console.log(`Server is listening on ${ls}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
})();

server.setErrorHandler(errorHandler);

for (let schema of [...businessSchema, ...userSchema, ...orderSchema]) {
    server.addSchema(schema);
}

server.get('/', function (req, res) {
    return new SuccessMsgResponse('Server is up and running.').send(res)
})

server.get('*', function (req, res) {
    throw new NoEntryError(`Cannot find ${req.originalUrl} on this server`);
})


server.register(businessRoutes, { prefix: '/api/v1/business' });
server.register(userRoutes, { prefix: '/api/v1/user' });
server.register(orderRoutes, { prefix: '/api/v1/order' });