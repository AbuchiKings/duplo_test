import { FastifyInstance } from "fastify";
import { $ref } from "./business.schema";
import BusinessController from './business.controller';


async function businessRoutes(server: FastifyInstance) {
    server.post('/',
        {
            schema: {
                body: $ref("createBusinessSchema")
            }
        },
        BusinessController.createBusiness
    )
}



export default businessRoutes;
