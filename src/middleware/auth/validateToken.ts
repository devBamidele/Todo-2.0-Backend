
import { Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { IReq, Todo } from '../../models/interfaces';
import { RequestError } from '../../other/classes';
import { EnvVars, ErrorMessages, HttpStatusCodes } from '../../constants';
import { isIUser } from '../../utils';


const validateToken = (
    req: IReq<Todo>,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .send(ErrorMessages.ACCESS_DENIED_NO_TOKEN);


    jwt.verify(token, EnvVars.Jwt.key, (err, decoded) => {
        if (err) {
            return res
                .status(HttpStatusCodes.FORBIDDEN)
                .send(ErrorMessages.INVALID_TOKEN);
        }

        if (!isIUser(decoded)) {
            throw new RequestError(HttpStatusCodes.BAD_REQUEST, ErrorMessages.MISSING_USER_DATA);
        }

        req.user = decoded;

        next();
    });
}

export { validateToken };