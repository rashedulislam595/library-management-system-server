import { pool } from "../../db";
import type { IBooks, IUpdateBook } from "./books.interface";

const createBookIntoDB = async(payload:IBooks)=>{
    const {title,category,publisher,published_year,total_copies,available_copies,description,author} = payload;
    const result = await pool.query(`
        INSERT INTO books (title,category,publisher,published_year,total_copies,available_copies,description,author)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
        `,[title,category,publisher,published_year,total_copies,available_copies,description,author]);
    return result;
}

const getAllBooksIntoDB = async()=>{
    const result = await pool.query(`
        SELECT * FROM books
        `)
    return result;
}

const getBook = async(id:string)=>{
    const result = await pool.query(`
        SELECT * FROM books WHERE id=$1
        `,[id]);
    return result
}

const updateBookIntoDB = async(payload:IUpdateBook, id:string)=>{

    const{title,total_copies,available_copies,description,author} = payload

    const result = await pool.query(`
        UPDATE books
        SET
        title = COALESCE($1,title),
        total_copies = COALESCE($2,total_copies),
        available_copies = COALESCE($3,available_copies),
        description = COALESCE($4, description),
        author = COALESCE($5,author),
        updated_at = NOW()

        WHERE id=$6 RETURNING *
        `,[title ?? null, total_copies ?? null, available_copies ?? null, description ?? null, author ?? null, id]);
    return result
}

export const booksService = {
    createBookIntoDB,
    getAllBooksIntoDB,
    getBook,
    updateBookIntoDB
}