import bcrypt from "bcryptjs";

export const hashPass = async(plainPassword:string)=>{
    const hash =await bcrypt.hash(plainPassword,8)
    return hash;
}