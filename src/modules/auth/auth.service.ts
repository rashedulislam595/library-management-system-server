import config from "../../config";
import { pool } from "../../db";
import { hashPass, passwordCompare } from "../../utils/passwordHandler";
import type { ILogin, IRegister } from "./auth.interface";
import jwt from 'jsonwebtoken';

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

const loginUserIntoDB = async(payload:ILogin)=>{
    //todo: Check if the user exist
    //todo: check if the password match
    //todo: Check the user status
    //todo: If pass all then generate jwt token
    const {email,password}=payload;

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email])
    
    if(user.rowCount === 0){
        throw new Error("Invalid credential!!")
    }
    
    const matchPassword = await passwordCompare(password,user.rows[0].password);

    if(!matchPassword){
        throw new Error("Password is wrong!!")
    }

    if(user.rows[0].status !=="active"){
        throw new Error("Access Denied!!")
    }

    const jwtPayload = {
        id:user.rows[0].id,
        name:user.rows[0].name,
        email:user.rows[0].email,
        status:user.rows[0].status,
        role:user.rows[0].role,
    }

    const accessToken = jwt.sign(payload,config.jwt_secret_key,{
        expiresIn:"1d"
    })

    const refreshToken = jwt.sign(payload,config.refresh_secret_key,{
        expiresIn:"10d"
    })

    delete user.rows[0].password
    return {accessToken,refreshToken,user: user.rows[0]}

}

export const authServices={
    createUserIntoDB,
    loginUserIntoDB,
}