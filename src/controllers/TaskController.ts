import { Response } from "express";
import { IReq, Todo, UpdateTodo } from "../models/interfaces";
import TaskService from "../services/TaskService";
import { HttpStatusCodes } from "../constants";


async function getAll(_: IReq, res: Response) {
    const result = await TaskService.getAll(_);
    res.status(HttpStatusCodes.OK).json(result).send();
}

async function get(_: IReq, res: Response) {
    
}

async function add(_: IReq<Todo>, res: Response) {
    const result = await TaskService.createTask(_);
    res.status(HttpStatusCodes.OK).json(result).send();
}

async function update(_: IReq<UpdateTodo>, res: Response) {
    const result = await TaskService.updateTask(_);
    res.status(HttpStatusCodes.OK).json(result).send();
}

async function remove(_: IReq<Todo>, res: Response) {

}


export default {
    getAll,
    get,
    add,
    update,
    remove,
} as const;