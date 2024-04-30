import mongoose, { Schema, model } from "mongoose";

const refreshSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    rshHash: { type: String, unique: true, required: true },
})

const Refresh = model('Refresh-Token', refreshSchema);

export default Refresh;