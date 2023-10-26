import { FastifyRequest, FastifyReply } from 'fastify';

import { ApiError, InternalError } from './ApiError';
import { ConflictMsgResponse, UnprocessibleEntityResponse } from './ApiResponse';

const errorHandler = (err: any, req: FastifyRequest, res: FastifyReply,) => {
    
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        if (err.code === 'FST_ERR_VALIDATION') {
            return new UnprocessibleEntityResponse(err.message).send(res);
        } else if (err.code === 'P2002') {
            return new ConflictMsgResponse(`${err.meta?.target[0]} is already in use`)
        }
        if (process.env.NODE_ENV === 'development') {
            //console.log(err) // eslint-disable-line
            return res.status(500).send(err.message);
        }
        ApiError.handle(new InternalError(), res);
    }
}

export default errorHandler;