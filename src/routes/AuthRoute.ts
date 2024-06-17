import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { Paths } from "../constants";
import { Login, Register } from "../models";
import { GTokenSchema, loginSchema, signupSchema } from "../schemas/validationSchema";
import { GToken } from "../models/interfaces";
import { validateAuthMiddleWare, validateRefresh } from "../middleware";


// ** Add AuthRouter ** //

const authRouter = Router();

authRouter.post(Paths.Auth.SignUp, [validateAuthMiddleWare<Register>(signupSchema)], AuthController.signUp);

authRouter.post(Paths.Auth.Login, [validateAuthMiddleWare<Login>(loginSchema)], AuthController.login);

authRouter.post(Paths.Auth.Validate, [validateAuthMiddleWare<GToken>(GTokenSchema)], AuthController.verifyGoogleToken);

authRouter.get(Paths.Auth.Refresh, validateRefresh, AuthController.refresh)

// **** Export default **** //

export default authRouter;