import UserModel, { User } from "../models/User";
import { sendEmail } from "../utils/mailer";
import { getCode } from "../utils/misc";

async function addUser(name: string, email: string, password: string) {
    const verification = getCode();

    const user = new UserModel({ name, email, password, verification });

    await user.save();

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
