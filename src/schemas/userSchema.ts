import { Schema, model, Document } from "mongoose";
import jwt from 'jsonwebtoken';
import EnvVars from "../constants/EnvVars";
import { User } from "../models/interfaces";

const userSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verification: { type: Object, requireed: true },
});

userSchema.methods.generateToken = function () {
  const { id, name, email } = this;

  return jwt.sign({ id, name, email }, EnvVars.Jwt.key, { expiresIn: '30m' });
}

userSchema.methods.generateRefresh = function () {
  const { id, name, email } = this;

  return jwt.sign({ id, name, email }, EnvVars.Jwt.Refresh);
}

const UserModel = model<User>('User', userSchema);

export default UserModel;