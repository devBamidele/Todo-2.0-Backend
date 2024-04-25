
import { ConnectionUri, JwtKey, RefreshToken } from '@src/pre-start';
import * as dotenv from 'dotenv';

dotenv.config(); 

export default {
    Port : (process.env.PORT ?? 8080),
    ConnectionUri : (process.env.CONNECTION_URI ?? ConnectionUri ?? ''),
    Jwt : {
        key : (process.env.JWT_KEY ?? JwtKey),
        Refresh : (process.env.REFRESH_TOKEN ?? RefreshToken)
    }
} as const;