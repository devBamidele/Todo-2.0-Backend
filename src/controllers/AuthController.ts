
// **** Functions **** //

import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { IReq, Login } from "../models/interfaces";
import { HttpStatusCodes } from "../constants";

/**
 * Register a user
 */
async function signUp(_: Request, res: Response) {
    const result = await AuthService.registerUser(_);
    res.status(HttpStatusCodes.OK).json(result).send()
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


export default {
    signUp,
    login
} as const;