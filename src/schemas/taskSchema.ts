import mongoose, { Schema, model } from "mongoose";
import { Task } from "../models";

const subTaskSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    task: { type: String, default: null, minLength: 3, required: true }
});

const taskSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, default: null },
    subtasks: [subTaskSchema]
});

const TaskModel = model<Task>('Task', taskSchema);

export default TaskModel;
