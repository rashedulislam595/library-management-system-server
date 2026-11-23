import { pool } from "../../db";
import { hashPass } from "../../utils/passwordHandler";
import type { IRegister } from "./auth.interface";

const createUserIntoDB = async(payload:IRegister)=>{
    const {name,email,password}= payload;
    const hashPassword = await hashPass(password);
    const result = await pool.query(`
        INSERT INTO users(name,email,password)
        VALUES($1,$2,$3) RETURNING id,name,email,role,status,created_at,updated_at
        `,[name,email,hashPassword]);
    delete result.rows[0].password;
    return result
}

export const authServices={
    createUserIntoDB,
}