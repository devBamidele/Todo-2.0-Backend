
// **** Functions **** //

import { Request, Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import AuthService from "../services/AuthService";
import { IReq, Login } from "../models/interfaces";

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
    const { token, refresh } = await AuthService.loginUser(_);
    return res.status(HttpStatusCodes.OK)
        .header('authorization', token)
        .header('refresh-token', refresh)
        .json({ message: "Login successful" });
}


export default {
    signUp,
    login
} as const;