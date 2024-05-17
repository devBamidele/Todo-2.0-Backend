import { Schema, Types, model } from "mongoose";

const refreshSchema = new Schema({
    userId: { type: Types.ObjectId, required: true },
    rshHash: { type: String, unique: true, required: true },
})

const Refresh = model('Refresh-Token', refreshSchema);

export default Refresh;