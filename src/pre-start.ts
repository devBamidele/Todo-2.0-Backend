import { setClientID, setConnectionUri, setJwtKey, setRefreshToken } from "./constants";
import { setRedirectUri } from "./constants/EnvVars";
import { Secrets } from "./models";
import { logger, openDbConnection } from "./utils";

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const projectID = 'todo-app-gcp';

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
        const [uri, jwtKey, refreshToken, client_id, client_secret, redirect_uri] = await Promise.all([
            accessSecret(Secrets.uri),
            accessSecret(Secrets.jwt),
            accessSecret(Secrets.refresh),
            accessSecret(Secrets.client_Id),
            accessSecret(Secrets.client_Secret),
            accessSecret(Secrets.redirect_uri)
        ]);

        // Update values
        setConnectionUri(uri);
        setJwtKey(jwtKey);
        setRefreshToken(refreshToken);
        setClientID(client_id);
        setClientID(client_secret);
        setRedirectUri(redirect_uri);

    } catch (error) {
        logger.error('Error:', error);
    }
}

// Switched to IIFE
(async () => {
    // Use only in production
    if (process.env.NODE_ENV === 'production') {
        await initialize();
    }

    // Open Db connection
    await openDbConnection();
})();



