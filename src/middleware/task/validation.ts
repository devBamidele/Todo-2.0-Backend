import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../../constants';
import { addTaskSchema, deleteSchema, updateTaskArraySchema } from '../../schemas/validationSchema';
import { ensureValidSubtaskIds } from '../../utils';
import { Subtask } from '../../models';

const ajv = new Ajv();
const addFormats = require("ajv-formats");

addFormats(ajv, ["date-time"]);

interface Source { subtasks?: Subtask[], [key: string]: any; }

const validate = (schema: object, dataSource: 'body' | 'params', useData?: boolean) => {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        let data: Source = req[dataSource];

        // Make sure the data object is present
        if (useData && data['data']) {
            data = data['data'];
        }

        if (validate(data)) {
            if (dataSource === 'body' && Array.isArray(data)) {
                data.forEach(task => {
                    if (task.subtasks && Array.isArray(task.subtasks)) {
                        ensureValidSubtaskIds(task.subtasks);
                    }
                });
            }
            next();
        } else {
            const error = validate.errors;

            res.status(HttpStatusCodes.BAD_REQUEST).json({ error });
        }
    };
};

const validateAdd = validate(addTaskSchema, 'body');
const validateUpdate = validate(updateTaskArraySchema, 'body', true);
const validateDelete = validate(deleteSchema, 'params');

export { validateAdd, validateUpdate, validateDelete };
