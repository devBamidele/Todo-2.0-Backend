
// **** Functions **** //

import { Request, Response } from "express";
import HttpStatusCodes from "../middleware/HttpStatusCodes";
import AuthService from "../services/AuthService";

/**
 * Register a user
 */
async function signUp(_: Request, res: Response) {
    const user = await AuthService.registerUser(_);
    return res.status(HttpStatusCodes.OK).json(user.res)
}

export default {
    signUp
} as const;