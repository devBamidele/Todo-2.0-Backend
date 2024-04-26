import * as dotenv from 'dotenv';

dotenv.config(); 

let JwtKey = '';
let RefreshToken = '';
let ConnectionUri = '';

export const setJwtKey = (JwtKey: string) => JwtKey;

export const setRefreshToken = (RefreshToken: string) => RefreshToken;

export const setConnectionUri = (ConnectionUri: string) => ConnectionUri;

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
