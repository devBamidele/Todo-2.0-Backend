import { Schema, model, Document } from "mongoose";
import jwt from 'jsonwebtoken';
import EnvVars from "../constants/EnvVars";
import logger from "../utils/logger";
import getEnvVars from "../constants/EnvVars";


export interface User extends Document {
  name: string,
  email: string,
  password: string,
  generateToken(): string;
}

const userSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateToken = function () {

  logger.info(`JwtKey: ${EnvVars.Jwt.key}, RefreshToken: ${EnvVars.Jwt.Refresh}`);

  // logger.info(`Prestart values:: JwtKey: ${JwtKey}, RefreshToken: ${RefreshToken}`);

  //return jwt.sign({ _id: this.id }, EnvVars.Jwt.key);
}

const UserModel = model<User>('User', userSchema);

export default UserModel;

