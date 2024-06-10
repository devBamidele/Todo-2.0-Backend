import { IReq, Todo, UpdateTodo } from "../models"
import TaskRepo from "../repos/TaskRepo";


async function getAll(req: IReq) {
    return await TaskRepo.getAll(req.user!.id);
}

async function createTask(req: IReq<Todo>) {
    const { title, description } = req.body;
    return await TaskRepo.addTask(req.user!.id, title, description);
}

async function updateTask(req: IReq<UpdateTodo>){
    return await TaskRepo.updateTask(req.body);    
}

export default {
    getAll,
    createTask,
    updateTask,
}
  