import { JSONSchemaType } from "ajv"
import { Register, Login, Todo, UpdateTodo, GToken, Subtask } from "../models";

const email = { type: 'string', format: 'email', minLength: 5, maxLength: 255 } as const;

const signupSchema: JSONSchemaType<Register> = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 5, maxLength: 50 },
        email,
        password: { type: 'string', minLength: 8 }
    },
    required: ['name', 'email', 'password'],
};

const loginSchema: JSONSchemaType<Login> = {
    type: 'object',
    properties: {
        email,
        password: { type: 'string', minLength: 8 }
    },
    required: ['email', 'password'],

}

const GTokenSchema: JSONSchemaType<GToken> = {
    type: 'object',
    properties: {
        idToken: { type: 'string' },
        email,
    },
    required: ['idToken', 'email'],
}

const subtaskSchema: JSONSchemaType<Subtask> = {
    type: 'object',
    properties: {
        _id: { type: 'string', nullable: true },
        task: { type: 'string', minLength: 3 },
    },
    required: ['task'],
    additionalProperties: false,
}

const addTaskSchema: JSONSchemaType<Todo> = {
    type: 'object',
    properties: {
        _id: { type: 'string', nullable: true },
        title: { type: 'string', maxLength: 100 },
        description: { type: 'string' },
        subtasks: {
            type: 'array',
            items: subtaskSchema,
        },
    },
    required: ['title'],
    additionalProperties: false,
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

export { signupSchema, loginSchema, addTaskSchema, updateTaskSchema, GTokenSchema }
