import { JwtKey, RefreshToken } from "../pre-start";
import * as dotenv from 'dotenv';
import logger from "../utils/logger";

dotenv.config(); 

function checker(){
    logger.info(`Check if the data from prestart is actually gotten `);
    logger.info(`JwtKey: ${JwtKey}, RefreshToken: ${RefreshToken}`);
}

if (process.env.NODE_ENV === 'production') {
    checker();
}

export default {
    Port : (process.env.PORT ?? 8080),
    ConnectionUri : (process.env.CONNECTION_URI ?? ''),
    Jwt : {
        key : (process.env.JWT_KEY ?? JwtKey ?? ''),
        Refresh : (process.env.REFRESH_TOKEN ?? RefreshToken)
    }
} as const;