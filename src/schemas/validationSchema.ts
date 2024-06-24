import { JSONSchemaType } from "ajv"
import { Register, Login, Todo, UpdateTodo, GToken, Subtask, Id, SubTask2 } from "../models";

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
        due_date: { type: 'string', format: 'date-time', nullable: true },
        subtasks: {
            type: 'array',
            items: subtaskSchema,
        },
    },
    required: ['title'],
    additionalProperties: false,
};

const updateSubTaskSchema: JSONSchemaType<SubTask2> = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        task: { type: 'string', minLength: 3 },
    },
    required: ['task', '_id'],
    additionalProperties: false,
}

const updateTaskSchema: JSONSchemaType<UpdateTodo> = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        title: { type: 'string', maxLength: 100, nullable: true },
        description: { type: 'string', nullable: true },
        due_date: { type: 'string', format: 'date-time', nullable: true },
        subtasks: {
            type: 'array',
            nullable: true,
            items: updateSubTaskSchema,
        }
    },
    required: ['_id']
}

const deleteSchema: JSONSchemaType<{ id: string }> = {
    type: 'object',
    properties: {
        id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
    },
    required: ['id'],
    additionalProperties: false
};


export { signupSchema, loginSchema, addTaskSchema, updateTaskSchema, GTokenSchema, deleteSchema }
