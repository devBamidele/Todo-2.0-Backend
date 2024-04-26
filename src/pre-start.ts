import { setJwtKey, setRefreshToken } from "./constants/EnvVars";
import { openDbConnection } from "./utils/db";
import logger from "./utils/logger";

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const projectID = 'todo-app-gcp';

// Exported variables
let ConnectionUri: string | undefined;
let JwtKey: string | undefined;
let RefreshToken: string | undefined;


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
        // Retrieve secrets
        const [uri, jwtKey, refreshToken,] = await Promise.all([
            accessSecret('CONNECTION_URI'),
            accessSecret('JWT_KEY'),
            accessSecret('REFRESH_TOKEN')
        ]);

        // Update values
        ConnectionUri = uri;
        setJwtKey(jwtKey);
        setRefreshToken(refreshToken);

    } catch (error) {
        logger.error('Error:', error);
    }
}

async function execute() {
    // Use only in production
    if (process.env.NODE_ENV === 'production') {
        await initialize();
    }

    // Open Db connection
    await openDbConnection(ConnectionUri)
}

execute();

export { JwtKey, RefreshToken }



