import { pool } from "../../db";
import type { IUser } from "./user.interface";
import { hashPass } from '../../utils/passwordHandler';

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

const updateUserIntoDB = async(payload:IUser,id :string)=>{
    const {name,email,password,role,status} = payload;
    const hashPassword =password && await hashPass(password);
    const result = await pool.query(`
        UPDATE users 
        SET
        name = COALESCE($1,name),
        email = COALESCE($2,email),
        password = COALESCE($3,password),
        role = COALESCE($4,role),
        status = COALESCE($5,status),
        updated_at = NOW()

        WHERE id=$6 RETURNING *

        `,[name??null, email??null, hashPassword??null, role??null,status??null, id]);
   
    delete result.rows[0].password;
    return result
}

const deleteUserIntoDB = async(id:string)=>{
    const result = await pool.query(`
        DELETE FROM users WHERE id=$1
        RETURNING *`,[id]);
    delete result.rows[0].password
    return result
}

export const usersService = {
    getAllUsersIntoDB,
    getSingleUserIntoDB,
    updateUserIntoDB,
    deleteUserIntoDB
}