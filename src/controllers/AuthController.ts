
// **** Functions **** //

import { Request, Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import AuthService from "../services/AuthService";

/**
 * Register a user
 */
async function signUp(_: Request, res: Response) {
    const user = await AuthService.registerUser(_);
    return res.status(HttpStatusCodes.OK).json(user.token)
}

export default {
    signUp
} as const;