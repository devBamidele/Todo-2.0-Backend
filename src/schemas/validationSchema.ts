import { JSONSchemaType } from "ajv"
import { Register, Login, Todo, UpdateTodo } from "../models";


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
        _id: { type: 'string', nullable: true },
        title: { type: 'string', maxLength: 100 },
        description: { type: 'string' }
    },
    required: ['title']
}

const updateTaskSchema: JSONSchemaType<UpdateTodo> = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        title: { type: 'string', maxLength: 100, nullable: true },
        description: { type: 'string', nullable: true }
    },
    required: ['_id']
}

export { signupSchema, loginSchema, addTaskSchema, updateTaskSchema }