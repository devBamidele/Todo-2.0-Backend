import { IReq, Todo, UpdateTodo } from "../models"
import TaskRepo from "../repos/TaskRepo";


async function getAll(req: IReq) {
    return await TaskRepo.getAll(req.user!.id);
}

async function createTask(req: IReq<Todo>) {
    const { title, description, subtasks } = req.body;
    return await TaskRepo.addTask(req.user!.id, title, description, subtasks);
}

async function updateTask(req: IReq<UpdateTodo>) {
    return await TaskRepo.updateTask(req.body);
}

async function removeTask(req: IReq) {
    const { id } = req.params;
    return await TaskRepo.deleteTask(id);
}

export default {
    getAll,
    createTask,
    updateTask,
    removeTask,
}
