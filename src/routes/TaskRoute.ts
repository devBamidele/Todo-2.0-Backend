import TaskController from "../controllers/TaskController";
import { validateToken } from "../middleware/auth/validateToken";
import { Router } from "express";
import { validateAdd } from "../middleware/task/validateAdd";
import { Paths } from "../constants";


// ** Create router ** //

const taskRouter = Router();

taskRouter.get(Paths.Task.GetAll, validateToken, TaskController.getAll);

taskRouter.get(Paths.Task.Get, validateToken, TaskController.get);

taskRouter.post(Paths.Task.Add, [validateAdd, validateToken], TaskController.add);

taskRouter.put(Paths.Task.Update, validateToken, TaskController.update);

taskRouter.delete(Paths.Task.Delete, validateToken, TaskController.remove);


// **** Export default **** //

export default taskRouter;
