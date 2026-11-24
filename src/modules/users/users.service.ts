import { pool } from "../../db";

const getAllUsersIntoDB = async()=>{
    const result = await pool.query(`
       SELECT * FROM users 
        `);
    const users = result.rows.map(({password,...user})=>user)
    return users;
}

const getSingleUserIntoDB = async(id:string)=>{
    const result = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `,[id]);
    delete result.rows[0].password;
    return result;
}

export const usersService = {
    getAllUsersIntoDB,
    getSingleUserIntoDB
}