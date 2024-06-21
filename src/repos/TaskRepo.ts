import { Subtask, UpdateTodo, Id } from "../models";
import TaskModel from "../schemas/taskSchema";

async function getAll(userId: Id) {
    const tasks = await TaskModel.find({ userId }).select(' -userId -__v');
    return { tasks }
}

async function addTask(userId: Id, title: string, description: string | null, subtasks: Subtask[]) {
    await TaskModel.create({ userId, title, description, subtasks });
    return { message: 'Task Added Successfully' }
}

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

async function deleteTask(_id: string) {

    const result = await TaskModel.deleteOne({ _id });

    if (result.deletedCount === 0) {
        return new Error("Task not found");
    }

    return { message: 'Task deleted successfully' };
        
}

export default { addTask, getAll, updateTask, deleteTask } as const