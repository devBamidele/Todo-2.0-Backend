import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from './HttpStatusCodes';
import { RouteError } from '../other/classes';
import logger from '../utils/logger';

export const ErrorHandler = (
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction
) => {

    logger.error(err)

    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
        status = err.status;
    }

    return res.status(status).json({ error: err.message });
}