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

    // Call the function to retrieve each secret
    (async () => {
        ConnectionUri = await accessSecret('CONNECTION_URI');
        JwtKey = await accessSecret('JWT_KEY');
        RefreshToken = await accessSecret('REFRESH_TOKEN');
    })();
}

( async () => await openDbConnection() )

