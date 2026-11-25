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
        
        //todo: Books table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS books(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) UNIQUE NOT NULL,
            author VARCHAR(50) NOT NULL,
            category VARCHAR(50) NOT NULL,
            publisher VARCHAR(50) NOT NULL,
            published_year INT NOT NULL,
            total_copies INT NOT NULL CHECK (total_copies >= 0),
            available_copies INT NOT NULL CHECK (available_copies >=0 AND available_copies <= total_copies),
            description TEXT NOT NULL,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)


        console.log("Database connecting successfully!!")
    } catch (error) {
        console.log(error)
    }
}