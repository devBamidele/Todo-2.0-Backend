import { Timestamp } from "mongodb";
import { Verify } from "../models/interfaces";


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
