import { IReq, Todo, UpdateTodo } from "../models"
import TaskRepo from "../repos/TaskRepo";


async function getAll(req: IReq) {
    return await TaskRepo.getAll(req.user!.id);
}

async function createTask(req: IReq<Todo>) {
    const { title, description, subtasks, due_date } = req.body;

    // Initialize date as null
    let date: Date | null = null;

    // Convert due_date to Date object if it exists
    if (due_date) {
        date = new Date(due_date);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date format provided for due_date.");
        }
    }

    // Create the task using the repository method
    return await TaskRepo.addTask(req.user!.id, title, description, subtasks, date);
}


async function updateTasks(req: IReq<UpdateTodo>) {
    return await TaskRepo.updateTasks(req.body);
}

async function removeTask(req: IReq) {
    const { id } = req.params;
    return await TaskRepo.deleteTask(id);
}

export default {
    getAll,
    createTask,
    updateTasks,
    removeTask,
}
