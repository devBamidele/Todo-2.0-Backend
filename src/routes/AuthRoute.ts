import { Router, Request, Response } from "express";
import Paths from "../constants/Paths";
import AuthController from "../controllers/AuthController";


// ** Add AuthRouter ** //

const authRouter = Router();

authRouter.post(Paths.Auth.SignUp, AuthController.signUp);

authRouter.post(Paths.Auth.Login);

// **** Export default **** //

export default authRouter;


