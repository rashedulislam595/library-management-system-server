import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path:path.resolve(process.cwd(),".env")
})

const config ={
    port: process.env.PORT,
    connection_string: process.env.DATABASE_URL as string,
    jwt_secret_key:process.env.JWT_SECRET_KEY as string,
    refresh_secret_key: process.env.REFRESH_SECRET_KEY as string
}

export default config;
