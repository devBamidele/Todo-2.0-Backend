
// **** Functions **** //

import { Request, Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import AuthService from "../services/AuthService";

/**
 * Register a user
 */
async function signUp(_: Request, res: Response) {
    const result = await AuthService.registerUser(_);
    return res.status(HttpStatusCodes.OK).json(result)
}

/*
* Login a user
*/
async function login(_:Request, res: Response) {
    const result = await AuthService.loginUser(_);
    return res.status(HttpStatusCodes.OK).json(result)

}

export default {
    signUp,
    login
} as const;