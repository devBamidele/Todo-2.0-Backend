import * as dotenv from 'dotenv';
import logger from "../utils/logger";

dotenv.config(); 

let JwtKey = '';
let RefreshToken = '';

export const setJwtKey = (value: string) => {
    JwtKey = value;
};

export const setRefreshToken = (value: string) => {
    RefreshToken = value;
};

const EnvVars = {
    Port: process.env.PORT ?? 8080,
    ConnectionUri: process.env.CONNECTION_URI ?? '',
    Jwt: {
        key: process.env.JWT_KEY ?? JwtKey,
        Refresh: process.env.REFRESH_TOKEN ?? RefreshToken
    }
} as const;

export default EnvVars;
