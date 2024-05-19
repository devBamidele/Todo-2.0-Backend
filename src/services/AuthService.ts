import { Request } from "express"
import bcrypt from 'bcrypt';
import UserRepo from "../repos/UserRepo";
import { RequestError } from "../other/classes";
import Refresh from "../schemas/refreshSchema";
import { IReq, IUser, Login, UserId } from "../models";
import { ErrorMessages, HttpStatusCodes } from "../constants";
import { getToken } from "../schemas/userSchema";

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

    if (!verified) {
        throw new RequestError(HttpStatusCodes.FORBIDDEN, ErrorMessages.USER_NOT_VERIFIED)
    }

    return { token, refresh, name: user.name, email: user.email };
}


async function verifyRefreshToken(userId: UserId, token: string): Promise<boolean> {
    const rshHashes = await Refresh.find({ userId });

    for (const refresh of rshHashes) {
        if (await bcrypt.compare(token, refresh.rshHash)) {
            return true;
        }
    }

    return false;
};

async function renewToken(_: IReq<string>): Promise<string> {
    const user = _.user as IUser

    if (await verifyRefreshToken(user.id, _.body)) {       

        const { id, name, email } = user;

        return getToken({ id, name, email }, '10m');
    }

    throw new RequestError( HttpStatusCodes.UNAUTHORIZED, ErrorMessages.INVALID_REFRESH_TOKEN)
}


export default {
    registerUser,
    loginUser,
    renewToken,
} as const;