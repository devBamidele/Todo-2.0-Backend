import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { signupSchema, loginSchema } from '../schemas/validationSchema';
import logger from '../utils/logger';

const ajv = new Ajv();
const addFormats = require("ajv-formats");

addFormats(ajv, ["email"]);

const validationMiddleware = (schema: object) => {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        if (validate(req.body)) {
            next();
        } else {
            const errors = validate.errors?.[0];
            const error = `${errors?.instancePath} ${errors?.message}`;

            res.status(HttpStatusCodes.BAD_REQUEST).json({ error });
        }
    };
};

const validateSignUp = validationMiddleware(signupSchema);

const validateLogin = validationMiddleware(loginSchema);

export { validateSignUp, validateLogin };


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    
}


/*
export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-auth-token'] as string;

    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    try {
        const decoded = jwt.verify(token, JWT_KEY) as { _id: string, isAdmin : boolean };
        req.user = decoded; // Attach the decoded user to the request object

        next();
    } catch (e) {
        return res.status(400).send('Invalid token.');
    }
};

*/
