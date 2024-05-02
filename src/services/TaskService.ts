import { Request } from "express"
import { IReq, Todo } from "../models/interfaces"
import TaskRepo from "../repos/TaskRepo";
import ErrorMessages from "../constants/ErrorMessages";
import logger from "../utils/logger";


async function getAll(req: IReq<Todo>) {
    return TaskRepo.getAll(req.user!.id);
}

async function createTask(req: IReq<Todo>) {
    const { title, description } = req.body;

    return TaskRepo.addTask(req.user!.id, title, description);
}



export default {
    getAll,
    createTask,
}
  