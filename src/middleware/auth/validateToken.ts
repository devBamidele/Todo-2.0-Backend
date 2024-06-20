
import { Response, NextFunction, Request } from 'express';
import jwt from "jsonwebtoken";
import { IReq } from '../../models/interfaces';
import { RequestError } from '../../other/classes';
import { EnvVars, ErrorMessages, HttpStatusCodes } from '../../constants';
import { isIUser } from '../../utils';


const validateToken = <T>(
    req: IReq<T>,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({error: ErrorMessages.ACCESS_DENIED_NO_TOKEN});


    jwt.verify(token, EnvVars.Jwt.key, (err, decoded) => {
        if (err) {
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({error: ErrorMessages.INVALID_TOKEN});
        }

        if (!isIUser(decoded)) {
            throw new RequestError(HttpStatusCodes.BAD_REQUEST, ErrorMessages.MISSING_USER_DATA);
        }

        req.user = decoded;

        next();
    });
}

const validateRefresh = (
    req: IReq<string>,
    res: Response,
    next: NextFunction
) => {
    const refreshHeader = req.headers['refresh'] as string | undefined;
    const refresh = refreshHeader?.split(' ')[1];

    if (!refresh) return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: ErrorMessages.INVALID_REFRESH_HEADER });

    jwt.verify(refresh, EnvVars.Jwt.Refresh, (err, decoded) => {
        if (err) {
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({ error: ErrorMessages.INVALID_REFRESH_TOKEN });
        }

        if (!isIUser(decoded)) {
            throw new RequestError(HttpStatusCodes.BAD_REQUEST, ErrorMessages.MISSING_USER_DATA);
        }

        req.user = decoded;
        req.body = refresh;

        next();
    });
}


// Higher-order function to create middleware
const validateTokenMiddleWare = <T = void>() => {
    return (req: Request, res: Response, next: NextFunction) =>
        validateToken<T>(req as Request as IReq<T>, res, next);
};

export { validateTokenMiddleWare, validateRefresh };