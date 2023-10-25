import { FastifyRequest, FastifyReply } from 'fastify';

import { ApiError, InternalError } from './ApiError';
import { UnprocessibleEntityResponse } from './ApiResponse';

const errorHandler = (err: Error, req: FastifyRequest, res: FastifyReply, ) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);

    } else {
        // @ts-ignore
        if (err.code === 'FST_ERR_VALIDATION' )  {
            return new UnprocessibleEntityResponse(err.message).send(res);
        }
        if (process.env.NODE_ENV === 'development') {
            //console.log(err) // eslint-disable-line
            return res.status(500).send(err.message);
        }
        ApiError.handle(new InternalError(), res);
    }
}

export default errorHandler;