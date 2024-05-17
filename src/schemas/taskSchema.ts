import mongoose, { Schema, model } from "mongoose";
import { Task } from "../models";

const taskSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String },
});

const TaskModel = model<Task>('Task', taskSchema);

export default TaskModel;
