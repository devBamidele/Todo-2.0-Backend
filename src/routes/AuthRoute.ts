import { Router, Request, Response } from "express";
import Paths from "../constants/Paths";
import AuthController from "../controllers/AuthController";
import { validateLogin, validateSignUp } from "../middleware/Validation";


// ** Add AuthRouter ** //

const authRouter = Router();

authRouter.post(Paths.Auth.SignUp, validateSignUp, AuthController.signUp);

authRouter.post(Paths.Auth.Login, validateLogin, AuthController.login);

// **** Export default **** //

export default authRouter;


