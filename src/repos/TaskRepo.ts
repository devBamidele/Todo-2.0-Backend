import { Subtask, UpdateTodo, Id } from "../models";
import TaskModel from "../schemas/taskSchema";

async function getAll(userId: Id) {
    const tasks = await TaskModel.find({ userId }).select(' -userId -__v');
    return { tasks }
}

async function addTask(userId: Id, title: string, description: string | null, subtasks: Subtask[], due_date: Date | null) {
    await TaskModel.create({ userId, title, description, subtasks, due_date });
    return { message: 'Task Added Successfully' }
}

async function updateTasks(tasks: UpdateTodo) {
    const updateOperations = tasks.data.map(({ _id, ...updateFields }) => ({
        updateOne: {
            filter: { _id },
            update: { $set: updateFields },
            upsert: false, // Set to true if you want to upsert (insert if not exists)
            runValidators: true,
        }
    }));

    const results = await TaskModel.bulkWrite(updateOperations);

    if (!results?.isOk) {
        throw new Error('No tasks found to update or no changes made');
    }

    return { message: 'Tasks Updated Successfully' };
}

async function deleteTask(_id: string) {

    const result = await TaskModel.deleteOne({ _id });

    if (result.deletedCount === 0) {
        return new Error("Task not found");
    }

    return { message: 'Task deleted successfully' };
        
}

export default { addTask, getAll, updateTasks, deleteTask } as const