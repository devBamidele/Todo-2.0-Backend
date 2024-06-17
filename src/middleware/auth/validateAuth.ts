import Ajv from 'ajv';
import { Response, NextFunction, Request } from 'express';
import { IReq } from '../../models';
import { HttpStatusCodes } from '../../constants';

const ajv = new Ajv();
const addFormats = require("ajv-formats");

addFormats(ajv, ["email"]);

const validateAuth = <T>(
    schema: object,
    req: IReq<T>,
    res: Response,
    next: NextFunction
) => {
    const validate = ajv.compile(schema);

    if (validate(req.body)) {
        next();
    } else {
        const error = validate.errors;

        res.status(HttpStatusCodes.BAD_REQUEST).json({ error });
    }
}

const validateAuthMiddleWare = <T = void>(schema: object) => {
    return (req: Request, res: Response, next: NextFunction) =>
        validateAuth<T>(schema, req as Request as IReq<T>, res, next)
}

export { validateAuthMiddleWare };

