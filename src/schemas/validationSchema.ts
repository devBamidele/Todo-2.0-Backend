import { JSONSchemaType } from "ajv"
import { Register, Login, Todo } from "../models/interfaces";

const signupSchema: JSONSchemaType<Register> = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 5, maxLength: 50, },
        email: { type: 'string', format: 'email', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 8 }
    },
    required: ['name', 'email', 'password'],
};

const loginSchema: JSONSchemaType<Login> = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 8 }
    },
    required: ['email', 'password'],

}

const addTaskSchema: JSONSchemaType<Todo> = {
    type: 'object',
    properties: {
        title: { type: 'string', maxLength: 100, },
        description: { type: 'string' }
    },
    required: ['title']
}

export { signupSchema, loginSchema, addTaskSchema }