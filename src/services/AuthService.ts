import { Request } from "express"
import bcrypt from 'bcrypt';
import UserRepo from "../repos/UserRepo";
import { RequestError } from "../other/classes";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import ErrorMessages from "../constants/ErrorMessages";

async function registerUser(req: Request) {
    const { name, email, password } = req.body;

    const { exists } = await UserRepo.userExists(email);

    if (exists) {
        throw new RequestError(HttpStatusCodes.CONFLICT, ErrorMessages.EMAIL_IN_USE);
    }

    const hashed = await bcrypt.hash(password, 10);

    return UserRepo.addUser(name, email, hashed);
}

async function loginUser(req: Request) {
    const { email, password } = req.body;

    const { exists, user } = await UserRepo.userExists(email);

    if (!exists || user == null) {
        throw new RequestError(HttpStatusCodes.NOT_FOUND, ErrorMessages.INVALID_CREDENTIALS);
    }

    const valid = await bcrypt.compare(password, user.password);

    return { valid }
}


export default {
    registerUser,
    loginUser,
} as const;