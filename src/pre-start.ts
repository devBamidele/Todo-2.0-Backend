import { openDbConnection } from "./utils/db";
import logger from "./utils/logger";

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const projectID = 'todo-app-gcp';

// Exported variables
export let ConnectionUri: string | undefined;
export let JwtKey: string | undefined;
export let RefreshToken: string | undefined;


// Use only in production
if (process.env.NODE_ENV === 'production') {

    logger.info(" We're in production ")

    async function accessSecret(secretName: string) {

        try {
            const client = new SecretManagerServiceClient();

            const name = `projects/${projectID}/secrets/${secretName}/versions/latest`;

            const [version] = await client.accessSecretVersion({ name });

            return version.payload.data.toString('utf8');

        } catch (error) {
            logger.error(`Error accessing secret ${secretName}:`, error);
            return undefined;
        }

    }

    async function initialize() {
        try {
            // Retrieve CONNECTION_URI
            const uri = await accessSecret('CONNECTION_URI');
            ConnectionUri = uri;
            logger.info(`The connection uri ${ConnectionUri}`);
    
            // Retrieve JWT_KEY and REFRESH_TOKEN in parallel
            const [jwtKey, refreshToken] = await Promise.all([
                accessSecret('JWT_KEY'),
                accessSecret('REFRESH_TOKEN')
            ]);
            JwtKey = jwtKey;
            RefreshToken = refreshToken;


            logger.info(`The JWT key ${JwtKey}`);
            logger.info(`The Refresh Token ${RefreshToken}`);
    
            // Open DB connection
            await openDbConnection();
        } catch (error) {
            logger.error('Error:', error);
        }
    }
    
    initialize();
}

if (process.env.NODE_ENV !== 'production') {
    (async () => await openDbConnection())();
}


