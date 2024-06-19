import { Request } from 'express';
import { UserId } from './types';

export interface Login {
    email: string;
    password: string;
}

export interface GToken {
    idToken: string;
    email: string;
}

export interface GoogleUserInfo {
    iss: string;
    azp?: string;
    aud?: string;
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture?: string;
    given_name: string;
    family_name: string;
    iat: number;
    exp: number;
}


export interface Register {
    name: string;
    email: string;
    password: string;
}

export interface Verify {
    isVerified: boolean,
    code: number,
    expiresAt: Date,
}

export interface Todo {
    _id?: string
    title: string,
    description: string | null,
    subtasks: Subtask[],
}

export interface Subtask {
    _id?: string,
    task: string | null,
}

export interface Task extends Document {
    userId: UserId,
    title: string,
    description: string,
    subtask: {
        task: string,
    }[]
}


export interface UpdateTodo {
    _id: string;
    title?: string;
    description?: string;
}

export interface User extends Document {
    name: string,
    email: string,
    password: string,
    verification: Verify,
    generateToken(): string,
    generateRefresh(): string,
}

export interface IUser {
    id: UserId,
    name: string,
    email: string,
}

export interface IReq<T = void> extends Request {
    body: T;
    user?: IUser;
}