import { Router, Request, Response } from "express";
import Paths from "../constants/Paths";
import AuthController from "../controllers/AuthController";
import { validateInput } from "../middleware/Validation";


// ** Add AuthRouter ** //

const authRouter = Router();

authRouter.post(Paths.Auth.SignUp, validateInput, AuthController.signUp );

authRouter.post(Paths.Auth.Login);

// **** Export default **** //

export default authRouter;


