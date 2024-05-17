import { UserId } from "../models";
import TaskModel from "../schemas/taskSchema";

async function getAll(userId: UserId){

    const tasks =  await TaskModel.find({ userId }).select(' -userId -__v');

    return { tasks }
}

async function addTask(userId: UserId, title: string, description: string | null) {

    await TaskModel.create({userId, title, description});

    return { message: 'Task Added Successfully' }
}

export default { addTask, getAll } as const