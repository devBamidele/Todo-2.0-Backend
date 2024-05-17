import { Request, Response, NextFunction } from 'express';
import { RequestError, RouteError } from '../other/classes';
import { logger } from '../utils';
import { HttpStatusCodes } from '../constants';

export const ErrorHandler = (
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction
) => {

    logger.error(err.message)

    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
        status = err.status;
    } else if(err instanceof RequestError){
        status = err.status
    }

    return res.status(status).json({ error: err.message });
}