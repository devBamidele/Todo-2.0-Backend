import bcrypt from 'bcrypt';
import UserRepo from "../repos/UserRepo";
import { RequestError } from "../other/classes";
import Refresh from "../schemas/refreshSchema";
import { IReq, IUser, Login, Register, UserId } from "../models";
import { EnvVars, ErrorMessages, HttpStatusCodes } from "../constants";
import { getToken } from "../schemas/userSchema";
import { GToken, GoogleUserInfo } from "../models/interfaces";
import { getRandomPassword } from "../utils";
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = EnvVars.Client.id;
const client = new OAuth2Client(CLIENT_ID);

async function registerUser(req: IReq<Register>) {
    const { name, email, password } = req.body;

    const { exists } = await UserRepo.userExists(email);

    if (exists) {
        throw new RequestError(HttpStatusCodes.CONFLICT, ErrorMessages.EMAIL_IN_USE);
    }

    const hashed = await bcrypt.hash(password, 10);

    const { message } = await UserRepo.addUser(name, email, hashed);

    return { message }
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

async function verifyGoogleToken(req: IReq<GToken>) {
    const { idToken, email } = req.body;

    try {
        const ticket = await client.verifyIdToken({ idToken, requiredAudience: CLIENT_ID });
        const payload: GoogleUserInfo = ticket.getPayload();

        if (payload.email !== email) {
            throw new RequestError(HttpStatusCodes.UNAUTHORIZED, ErrorMessages.EMAIL_MISMATCH);
        }

        const { exists, user } = await UserRepo.userExists(email);

        let currentUser = user;

        if (!exists) {
            const hashed = await bcrypt.hash(getRandomPassword(), 10);

            const { user } = await UserRepo.addUser(payload.given_name, email, hashed);

            currentUser = user;
        }

        if (!currentUser) {
            throw new RequestError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.USER_CREATION_FAILED);
        }

        const token = currentUser.generateToken();
        const refresh = currentUser.generateRefresh();

        const rshHash = await bcrypt.hash(refresh, 10);

        // Store the refresh token in mongodb
        await Refresh.create({ rshHash, userId: currentUser._id });

        if (!payload.email_verified) {
            throw new RequestError(HttpStatusCodes.FORBIDDEN, ErrorMessages.USER_NOT_VERIFIED)
        }

        return { token, refresh };

    } catch (error) {
        if (error instanceof RequestError) {
            throw error;
        } else {
            throw new RequestError(HttpStatusCodes.UNAUTHORIZED, ErrorMessages.INVALID_TOKEN);
        }
    }
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

        return getToken({ id, name, email }, '20m');
    }

    throw new RequestError(HttpStatusCodes.UNAUTHORIZED, ErrorMessages.INVALID_REFRESH_TOKEN)
}

export default {
    verifyGoogleToken,
    registerUser,
    loginUser,
    renewToken,
} as const;