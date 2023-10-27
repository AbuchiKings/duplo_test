import { FastifyReply, FastifyRequest } from "fastify";

import { getOrderDetails, getCreditScore } from './order.service'
import { CreateOrderType } from "./order.schema";
import { CreatedSuccessResponse, SuccessResponse } from "../../utils/ApiResponse";
import { taskQueue } from '../../jobs/queue';

class OrderController {
    public static async createOrder(req: FastifyRequest<{ Body: CreateOrderType }>, res: FastifyReply) {
        const { amount, itemId } = req.body;
        let newOrder = {
            amount,
            itemId,
            businessId: req.user?.businessId,
            createdBy: req.user.id
        }
        const log = await taskQueue.add('log_order', newOrder, { removeOnComplete: true });
        return new CreatedSuccessResponse('Order successfully created', newOrder, 1).send(res);
    }

    public static async getOrderDetails(req: FastifyRequest, res: FastifyReply) {
        const order = await getOrderDetails(req.user.businessId);
        return new SuccessResponse ('Successfully retrieved', order, 1).send(res);
    }

    public static async getCreditScore(req: FastifyRequest, res: FastifyReply) {
        const order = await getCreditScore(req.user.businessId);
        return new SuccessResponse ('Successfully retrieved', order, 1).send(res);
    }
}

export default OrderController;