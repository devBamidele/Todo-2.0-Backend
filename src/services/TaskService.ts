import { IReq, Todo, UpdateTodo } from "../models"
import TaskRepo from "../repos/TaskRepo";


async function getAll(req: IReq) {
    return TaskRepo.getAll(req.user!.id);
}

async function createTask(req: IReq<Todo>) {
    const { title, description } = req.body;
    return TaskRepo.addTask(req.user!.id, title, description);
}

async function updateTask(req: IReq<UpdateTodo>){
    return TaskRepo.updateTask(req.body);    
}

export default {
    getAll,
    createTask,
    updateTask,
}
  