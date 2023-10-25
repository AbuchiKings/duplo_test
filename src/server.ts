import Fastify from "fastify";
import helmet from '@fastify/helmet'

import env from './config'
import errorHandler from "./utils/errorHandler";
//import postRoutes from "./modules/post/post.routes";

import { NoEntryError } from "./utils/ApiError";
//import { postSchema } from "./modules/post/post.schema";
import { SuccessMsgResponse } from "./utils/ApiResponse";

const server = Fastify();


(async function main() {
    try {
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

// for (const schema of [...postSchema]) {
//     server.addSchema(schema);
// }

server.get('/', function (req, res) {
    return new SuccessMsgResponse('Server is up and running.').send(res)
})

server.get('*', function (req, res) {
    throw new NoEntryError(`Cannot find ${req.originalUrl} on this server`);
})
//server.register(postRoutes, { prefix: '/api/v1/posts' });