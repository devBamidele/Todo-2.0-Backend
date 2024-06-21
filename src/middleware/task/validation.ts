import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../../constants';
import { addTaskSchema, deleteSchema, updateTaskSchema } from '../../schemas/validationSchema';

const ajv = new Ajv();

const validate = (schema: object, dataSource: 'body' | 'params' | 'query' = 'body') => {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[dataSource];
        if (validate(data)) {
            next();
        } else {
            const error = validate.errors;
            
            res.status(HttpStatusCodes.BAD_REQUEST).json({ error });
        }
    };
};

// Specific validation middlewares
const validateAdd = validate(addTaskSchema, 'body');
const validateUpdate = validate(updateTaskSchema, 'body');
const validateDelete = validate(deleteSchema, 'params');

export { validateAdd, validateUpdate, validateDelete };
