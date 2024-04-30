import { Request } from 'express';
import mongoose from 'mongoose';

export interface Login {
    email: string;
    password: string;
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
    title : string,
    description: string | null,
}

export interface Task extends Document {
    userId: mongoose.Types.ObjectId,
    title : string,
    description: string,
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
    id: mongoose.Types.ObjectId,
    name: string,
    email: string,
}

// **** Express **** //

export interface IReq<T = void> extends Request {
    body: T;
    user?: IUser;
}