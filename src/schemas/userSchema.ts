import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';
import { EnvVars } from "../constants";
import { User } from "../models";


const userSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  verification: { type: Object, requireed: true },
});

// Create a case-insensitive index on the email field
userSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

userSchema.methods.generateToken = function () {
  const { id, name, email } = this;

  return getToken({ id, name, email }, '1m');
}

userSchema.methods.generateRefresh = function () {
  const { id, name, email } = this;

  return getToken({ id, name, email }, '1y', true);
}

export const getToken = (payload : object, expiresIn? : string, isRefresh?: boolean) => {
  const secretKey = !!isRefresh ? EnvVars.Jwt.Refresh : EnvVars.Jwt.key;

  return jwt.sign(payload, secretKey, { expiresIn });
}

const UserModel = model<User>('User', userSchema);

export default UserModel;