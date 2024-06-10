import TaskController from "../controllers/TaskController";
import { NextFunction, Request, Response, Router } from "express";
import { validateAdd, validateTokenMiddleWare, validateUpdate } from "../middleware";
import { Paths } from "../constants";
import { Todo, UpdateTodo } from "../models";


// ** Create router ** //

const taskRouter = Router();

taskRouter.get(Paths.Task.GetAll, [validateTokenMiddleWare()], TaskController.getAll);

taskRouter.get(Paths.Task.Get, validateTokenMiddleWare(), TaskController.get);

taskRouter.post(Paths.Task.Add, [validateAdd, validateTokenMiddleWare<Todo>()], TaskController.add);

taskRouter.post(Paths.Task.Load, [validateTokenMiddleWare<Todo[]>()], TaskController.addAll);

taskRouter.patch(Paths.Task.Update, [validateUpdate, validateTokenMiddleWare<UpdateTodo>()], TaskController.update);

taskRouter.delete(Paths.Task.Delete, validateTokenMiddleWare(), TaskController.remove);


// **** Export default **** //

export default taskRouter;
