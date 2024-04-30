
import { Response, NextFunction } from 'express';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import ErrorMessages from '../../constants/ErrorMessages';
import jwt from "jsonwebtoken";
import EnvVars from '../../constants/EnvVars';
import { IReq, IUser, Todo } from '../../models/interfaces';


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

        req.user = decoded as IUser;

        next();
    });
}

export { validateToken };