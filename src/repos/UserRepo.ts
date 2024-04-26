import logger from "../utils/logger";
import UserModel from "../models/User";
import _ from 'lodash';

async function addUser(name: string, email: string, password: string) {
    const user = new UserModel({ name, email, password });

    await user.save();

    logger.info('User added successfully')

    const res = _.pick(user, ['_id', 'name', 'email']);

    user.generateToken();

    return { res };
}

export default {
    addUser,
} as const;