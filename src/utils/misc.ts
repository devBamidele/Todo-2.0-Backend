import { IUser, Verify } from "../models/interfaces";


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