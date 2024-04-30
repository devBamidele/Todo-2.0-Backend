import { Request } from "express"
import { IReq, Todo } from "../models/interfaces"
import TaskRepo from "../repos/TaskRepo";
import ErrorMessages from "../constants/ErrorMessages";


async function getAll(req: Request) {

}

async function createTask(req: IReq<Todo>) {
    const { title, description } = req.body;

    if (!req.user) {
        throw new Error(ErrorMessages.MISSING_USER_DATA);
    }

    return TaskRepo.addTask(req.user.id, title, description);
}



export default {
    getAll,
    createTask,
}
