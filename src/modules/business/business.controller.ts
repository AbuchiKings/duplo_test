
import { FastifyReply, FastifyRequest } from "fastify";

import * as Business from './business.service'
import { CreateBusinessType } from "./business.schema";
import { CreatedSuccessResponse } from "../../utils/ApiResponse";

class BusinessController {
    public static async createBusiness(req: FastifyRequest<{ Body: CreateBusinessType }>, res: FastifyReply) {
        const { name } = req.body;
        const data = await Business.createBusiness({ name});
        return new CreatedSuccessResponse('Business successfully created', data, 1).send(res);
    }
}


export default BusinessController;