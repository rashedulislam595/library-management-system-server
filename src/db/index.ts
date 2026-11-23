import { Pool } from "pg";
import config from "../config";


export const pool = new Pool({
    connectionString:config.connection_string
})

export const INITDB = async()=>{
    try {
        // todo: users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            status VARCHAR(20) DEFAULT 'active',
            role VARCHAR(20) DEFAULT 'member',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );
            `)


        console.log("Database connecting successfully!!")
    } catch (error) {
        console.log(error)
    }
}