import { FastifyInstance } from "fastify";
import UserController from "./user.controller";
import { $ref } from "./user.schema";


async function userRoutes(server: FastifyInstance) {
    server.post('/',
        {
            schema: {
                body: $ref("createUserSchema")
            }
        },
        UserController.createUser
    )

    server.post('/login',
        {
            schema: {
                body: $ref("loginSchema"),
            }
        },
        UserController.login
    )

}



export default userRoutes;
