import mongoose from 'mongoose';
import EnvVars from '../constants/EnvVars';
import logger from './logger';

const openDbConnection = async (connect? : string) => {
    try {

        logger.info(`The conection uri is ${connect ?? EnvVars.ConnectionUri}`)

        await mongoose.connect( connect ?? EnvVars.ConnectionUri);

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
