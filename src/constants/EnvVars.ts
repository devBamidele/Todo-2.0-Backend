import * as dotenv from 'dotenv';
import logger from "../utils/logger";

dotenv.config();

let JwtKey = '';
let RefreshToken = '';
let ConnectionUri = '';

export const setJwtKey = (value: string) => { JwtKey = value };

export const setRefreshToken = (value: string) => { RefreshToken = value };

export const setConnectionUri = (value: string) => { ConnectionUri = value };

const EnvVars = {
    Port: process.env.PORT ?? 8080,
    get ConnectionUri() {
        return process.env.CONNECTION_URI ?? ConnectionUri;
    },
    get Jwt() {
        return {
            key: process.env.JWT_KEY ?? JwtKey,
            Refresh: process.env.REFRESH_TOKEN ?? RefreshToken
        };
    }
};

export default EnvVars;
