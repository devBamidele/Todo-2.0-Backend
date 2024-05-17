import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateLogin, validateSignUp } from "../middleware/auth/validateAuth";
import { Paths } from "../constants";
import { validateRefresh } from "../middleware/auth/validateToken";


// ** Add AuthRouter ** //

const authRouter = Router();

authRouter.post(Paths.Auth.SignUp, validateSignUp, AuthController.signUp);

authRouter.post(Paths.Auth.Login, validateLogin, AuthController.login);

authRouter.get(Paths.Auth.refresh, validateRefresh, AuthController.refresh)

// **** Export default **** //

export default authRouter;