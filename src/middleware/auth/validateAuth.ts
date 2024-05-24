import Ajv from 'ajv';
import { Response, NextFunction } from 'express';
import { signupSchema, loginSchema } from '../../schemas/validationSchema';
import { IReq, Login } from '../../models';
import { HttpStatusCodes } from '../../constants';

const ajv = new Ajv();
const addFormats = require("ajv-formats");

addFormats(ajv, ["email"]);

const validation = (schema: object) => {
    const validate = ajv.compile(schema);

    return (req: IReq<Login>, res: Response, next: NextFunction) => {
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

