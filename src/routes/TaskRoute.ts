import Paths from "../constants/Paths";
import logger from "../utils/logger";
import { Router, Request, Response } from "express";


// ** Create router ** //

const taskRouter = Router();

taskRouter.get(Paths.Task.GetAll);

taskRouter.get(Paths.Task.Get);

taskRouter.post(Paths.Task.Add);

taskRouter.put(Paths.Task.Update);

taskRouter.delete(Paths.Task.Delete);


// **** Export default **** //

export default taskRouter;
