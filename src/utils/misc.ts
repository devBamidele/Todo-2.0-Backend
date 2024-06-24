import { IUser, Verify } from "../models/interfaces";
import mongoose from 'mongoose';


function getDuration(minutes = 0, hours = 0): Date {
    const now = Math.floor(Date.now() / 1000);
    const future = now + (minutes * 60) + (hours * 3600);

    return new Date(future * 1000);
}

function genCode(): number {
    return Math.floor(10000 + Math.random() * 90000);
}


export const getCode = (): Verify => {
    return {
        isVerified: false,
        code: genCode(),
        expiresAt: getDuration(5),
    }
}

export const getRandomPassword = (): string => (Math.random() + 1).toString(36).substring(2);

// Type guard function to check if an object conforms to IUser interface
export function isIUser(obj: any): obj is IUser {
    return (
        typeof obj === 'object' &&
        'id' in obj &&
        'name' in obj &&
        'email' in obj
    );
}


/**
 * Helper function to ensure all subtasks have valid ObjectId.
 * If _id is not a valid ObjectId, assigns a new mongoose.Types.ObjectId().
 * @param subtasks Array of subtasks to validate and possibly update.
 */
export const ensureValidSubtaskIds = (subtasks: any[]) => {
    for (let subtask of subtasks) {
        if (!mongoose.Types.ObjectId.isValid(subtask._id)) {
            subtask._id = new mongoose.Types.ObjectId();
        }
    }
};
