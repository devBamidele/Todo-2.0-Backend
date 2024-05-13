import { Request } from "express"
import bcrypt from 'bcrypt';
import UserRepo from "../repos/UserRepo";
import { RequestError } from "../other/classes";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import ErrorMessages from "../constants/ErrorMessages";
import Refresh from "../schemas/refreshSchema";
import { IReq, Login } from "../models/interfaces";

async function registerUser(req: Request) {
    const { name, email, password } = req.body;

    const { exists } = await UserRepo.userExists(email);

    if (exists) {
        throw new RequestError(HttpStatusCodes.CONFLICT, ErrorMessages.EMAIL_IN_USE);
    }

    const hashed = await bcrypt.hash(password, 10);

    return UserRepo.addUser(name, email, hashed);
}

async function loginUser(req: IReq<Login>) {
    const { email, password } = req.body;
    const { exists, user } = await UserRepo.userExists(email);

    if (!exists || user == null) {
        throw new RequestError(HttpStatusCodes.NOT_FOUND, ErrorMessages.INVALID_CREDENTIALS);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new RequestError(HttpStatusCodes.UNAUTHORIZED, ErrorMessages.INVALID_CREDENTIALS);
    }

    const token = user.generateToken();
    const refresh = user.generateRefresh();

    const rshHash = await bcrypt.hash(refresh, 10);

    // Store the refresh token in mongodb
    await Refresh.create({ rshHash, userId: user._id });

    const verified = user.verification.isVerified;

    if(!verified) {
        throw new RequestError(HttpStatusCodes.FORBIDDEN , ErrorMessages.USER_NOT_VERIFIED)
    }

    return { token, refresh };
}


export default {
    registerUser,
    loginUser,
} as const;