import mongoose from "mongoose";
import TaskModel from "../schemas/taskSchema";



async function addTask(userId: mongoose.Types.ObjectId, title: string, description: string | null) {

    await TaskModel.create({userId, title, description});

    return { message: 'Task Added Successfully' }
}

export default { addTask } as const