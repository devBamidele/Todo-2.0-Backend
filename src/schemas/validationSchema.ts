import {JSONSchemaType} from "ajv"
import { Register } from "../models/Register";
import { Login } from "../models/Login";

const signupSchema : JSONSchemaType<Register> = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 5, maxLength: 50 },
        email: { type: 'string', format: 'email', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 8 }
    },
    required: ['name', 'email', 'password'],
};

const loginSchema : JSONSchemaType<Login> = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 8 }
    },
    required: ['email', 'password'],

}

export  { signupSchema, loginSchema }