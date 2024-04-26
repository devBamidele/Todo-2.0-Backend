import { Request } from "express"
import bcrypt from 'bcrypt';
import UserRepo from "../repos/UserRepo";

async function registerUser(req: Request) {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    return UserRepo.addUser(name, email, hashed);
}


export default {
    registerUser,
} as const;