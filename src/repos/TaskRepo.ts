import { Subtask, UpdateTodo, UserId } from "../models";
import TaskModel from "../schemas/taskSchema";

async function getAll(userId: UserId) {
    const tasks = await TaskModel.find({ userId }).select(' -userId -__v');
    return { tasks }
}

async function addTask(userId: UserId, title: string, description: string | null, subtasks: Subtask[]) {
    await TaskModel.create({ userId, title, description, subtasks });
    return { message: 'Task Added Successfully' }
}

// Update task function
async function updateTask(task: UpdateTodo) {
    const { _id, ...updateFields } = task;

    const result = await TaskModel.updateOne(
        { _id },
        { $set: updateFields },
        { runValidators: true }
    );

    if (result.modifiedCount === 0) {
        throw new Error('No task found to update or no changes made');
    }

    return { message: 'Task Updated Successfully' };
}

export default { addTask, getAll, updateTask } as const