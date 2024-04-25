import mongoose from 'mongoose';
import EnvVars from '../constants/EnvVars';
import logger from './logger';

const openDbConnection = async () => {
    try {

        logger.info(`The conection uri is ${EnvVars.ConnectionUri}`)

        await mongoose.connect(EnvVars.ConnectionUri);

        logger.info('Connected to MongoDB');

    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
    }
};

const closeDbConnection = async () => {

    await mongoose.disconnect();

    logger.info('Disconnected from MongoDB');
};

export { openDbConnection , closeDbConnection };
