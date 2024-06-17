import * as dotenv from 'dotenv';

dotenv.config();

let JwtKey = '';
let RefreshToken = '';
let ConnectionUri = '';
let ClientID = '';
let ClientSecret = '';
let RedirectUri = '';

export const setJwtKey = (value: string) => { JwtKey = value };

export const setRefreshToken = (value: string) => { RefreshToken = value };

export const setConnectionUri = (value: string) => { ConnectionUri = value };

export const setClientID = (value: string) => { ClientID = value };

export const setClientSecret = (value: string) => { ClientSecret = value };

export const setRedirectUri = (value: string) => { RedirectUri = value };

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
    },
    get Client() {
        return {
            id: process.env.CLIENT_ID ?? ClientID,
            secret: process.env.CLIENT_SECRET ?? ClientSecret,
        };
    },

    get RedirectUri() {
        return process.env.REDIRECT_URI ?? RedirectUri;
    }
};

export default EnvVars;