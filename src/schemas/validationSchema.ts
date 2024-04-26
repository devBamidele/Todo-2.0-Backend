import {JSONSchemaType} from "ajv"
import { Register } from "../models/Register";

const schema : JSONSchemaType<Register> = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 5, maxLength: 50 },
        email: { type: 'string', format: 'email', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 8 }
    },
    required: ['name', 'email', 'password'],
};

export { schema }