import { FastifyInstance } from "fastify";
import { $ref } from "./order.schema";
import OrderController from './order.controller';
import { verifyToken } from "../../middlewares/auth";


async function orderRoutes(server: FastifyInstance) {
    server.addHook("preHandler", verifyToken);

    server.post('/',
        {
            schema: {
                body: $ref("createOrderSchema")
            }
        },
        OrderController.createOrder
    )

    server.get('/details', {}, OrderController.getOrderDetails)
    server.get('/score', {}, OrderController.getCreditScore)
}


export default orderRoutes;
