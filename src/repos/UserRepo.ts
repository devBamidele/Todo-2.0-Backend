import UserModel from "../schemas/userSchema";
import { getCode } from "../utils";

async function addUser(name: string, email: string, password: string) {
    const verification = getCode();

    await UserModel.create({ name, email, password, verification })

    // sendEmail();

    return { message: `User added successfully, email sent to ${email}` };
}

async function userExists(email: string) {

    const user = await UserModel.findOne({ email });

    return { exists : !!user , user };
}

export default {
    addUser,
    userExists,
} as const;
