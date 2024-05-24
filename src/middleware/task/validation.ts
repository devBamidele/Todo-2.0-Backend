import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../../constants';
import { addTaskSchema, updateTaskSchema } from '../../schemas/validationSchema';

const ajv = new Ajv();

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

const validateAdd = validation(addTaskSchema);

const validateUpdate = validation(updateTaskSchema);

export { validateAdd, validateUpdate }