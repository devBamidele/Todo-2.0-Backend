import { IReq, Todo } from "../models/interfaces"
import TaskRepo from "../repos/TaskRepo";


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
  