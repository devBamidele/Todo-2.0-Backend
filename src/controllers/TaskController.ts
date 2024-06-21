import { Response } from "express";
import { IReq, Todo, UpdateTodo } from "../models/interfaces";
import TaskService from "../services/TaskService";
import { HttpStatusCodes } from "../constants";
import TaskModel from "../schemas/taskSchema";
import { Id } from "../models";


async function getAll(_: IReq, res: Response) {
    const result = await TaskService.getAll(_);
    return res.status(HttpStatusCodes.OK).json(result);
}

async function get(_: IReq, res: Response) {

}

async function add(_: IReq<Todo>, res: Response) {
    const result = await TaskService.createTask(_);
    return res.status(HttpStatusCodes.OK).json(result);
}

async function update(_: IReq<UpdateTodo>, res: Response) {
    const result = await TaskService.updateTask(_);
    return res.status(HttpStatusCodes.OK).json(result);
}

async function remove(_: IReq, res: Response) {
    const result = await TaskService.removeTask(_);
    return res.status(HttpStatusCodes.OK).json(result);
}

async function addAll(_: IReq<Todo[]>, res: Response) {

    const userId: Id = _.user!.id;

    const tasksWithUserId = _.body.map(task => ({ ...task, userId }));

    const addedTasks = await TaskModel.insertMany(tasksWithUserId);
    res.status(201).json({ message: 'Tasks added successfully' });
}


export default {
    getAll,
    addAll,
    get,
    add,
    update,
    remove,
} as const;