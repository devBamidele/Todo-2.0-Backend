import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { schema } from '../schemas/validationSchema';

const ajv = new Ajv();
const addFormats = require("ajv-formats");

addFormats(ajv, ["email"]);

// Validation middleware
const validateInput = (req: Request, res: Response, next: NextFunction) => {
    const validate = ajv.compile(schema);

    if (validate(req.body)) {
        next();
    } else {
        const error = validate.errors?.[0];
        const errorMsg = `${error?.instancePath} ${error?.message}`;

        res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errorMsg });
    }
};

export { validateInput }