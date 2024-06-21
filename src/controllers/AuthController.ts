
// **** Functions **** //

import { Response } from "express";
import AuthService from "../services/AuthService";
import { GToken, IReq, Login, Register } from "../models/interfaces";
import { HttpStatusCodes } from "../constants";

/**
 * Register a user
 */
async function signUp(_: IReq<Register>, res: Response) {
    const result = await AuthService.registerUser(_);
    return res.status(HttpStatusCodes.OK).json(result);
}

/*
 * Login a user
 */
async function login(_: IReq<Login>, res: Response) {
    const { token, refresh, name, email } = await AuthService.loginUser(_);
    return res.status(HttpStatusCodes.OK)
        .header('auth', token)
        .header('refresh', refresh)
        .json({
            message: "Login successful",
            data: { name, email }
        });
}

async function verifyGoogleToken(_: IReq<GToken>, res: Response) {
    const { token, refresh } = await AuthService.verifyGoogleToken(_);

    return res.status(HttpStatusCodes.OK)
        .header('auth', token)
        .header('refresh', refresh)
        .json({ message: "Login successful" });
}

/*
 * Refresh the access token
 */
async function refresh(_: IReq<string>, res: Response) {
    const token = await AuthService.renewToken(_);
    return res.status(HttpStatusCodes.OK)
        .header('auth', token)
        .json({ message: "Access token created successfully" })
}

export default {
    signUp,
    login,
    refresh,
    verifyGoogleToken,
} as const;