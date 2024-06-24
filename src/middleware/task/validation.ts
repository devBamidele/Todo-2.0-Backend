import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../../constants';
import { addTaskSchema, deleteSchema, updateTaskSchema } from '../../schemas/validationSchema';
import { ensureValidSubtaskIds } from '../../utils';
import { Subtask } from '../../models';

const ajv = new Ajv();
const addFormats = require("ajv-formats");

addFormats(ajv, ["date-time"]);

interface Source { subtasks?: Subtask[], [key: string]: any; }

const validate = (schema: object, dataSource: 'body' | 'params' ) => {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        const data: Source = req[dataSource];

        if (validate(data)) {
            // Check and ensure valid subtask IDs if dataSource is 'body'
            if (dataSource === 'body' && data.subtasks && Array.isArray(data.subtasks)) {
                ensureValidSubtaskIds(data.subtasks);
            }
            next();
        } else {
            const error = validate.errors;

            res.status(HttpStatusCodes.BAD_REQUEST).json({ error });
        }
    };
};

const validateAdd = validate(addTaskSchema, 'body');
const validateUpdate = validate(updateTaskSchema, 'body');
const validateDelete = validate(deleteSchema, 'params');

export { validateAdd, validateUpdate, validateDelete };
