import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { signupSchema, loginSchema } from '../../schemas/validationSchema';

const ajv = new Ajv();
const addFormats = require("ajv-formats");

addFormats(ajv, ["email"]);

const validation = (schema: object) => {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        if (validate(req.body)) {
            next();
        } else {
            const error = validate.errors;

            res.status(HttpStatusCodes.BAD_REQUEST).json({ error });
        }
    };
};

const validateSignUp = validation(signupSchema);

const validateLogin = validation(loginSchema);

export { validateSignUp, validateLogin };
