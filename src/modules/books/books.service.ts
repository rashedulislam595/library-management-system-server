import { pool } from "../../db";
import type { IBooks } from "./books.interface";

const createBookIntoDB = async(payload:IBooks)=>{
    const {title,category,publisher,published_year,total_copies,available_copies,description,author} = payload;
    const result = await pool.query(`
        INSERT INTO books (title,category,publisher,published_year,total_copies,available_copies,description,author)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
        `,[title,category,publisher,published_year,total_copies,available_copies,description,author]);
    return result;
}

export const booksService = {
    createBookIntoDB,
}