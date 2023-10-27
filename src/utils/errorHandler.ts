import { FastifyRequest, FastifyReply } from 'fastify';

import { ApiError, InternalError } from './ApiError';
import { ConflictMsgResponse, UnprocessibleEntityResponse } from './ApiResponse';

const errorHandler = (err: any, req: FastifyRequest, res: FastifyReply,) => {
    console.log(err)
    if (err.code === 'FST_ERR_VALIDATION') {
        return new UnprocessibleEntityResponse(err.message).send(res);
    } else if (err.code === 'P2002') {
        return new ConflictMsgResponse(`${err.meta?.target[0]} is already in use`).send(res)
    } else {
        ApiError.handle(err, res);
    }
}

export default errorHandler;