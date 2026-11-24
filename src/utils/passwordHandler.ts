import bcrypt from "bcryptjs";

export const hashPass = async(plainPassword:string)=>{
    const hash =await bcrypt.hash(plainPassword,8)
    return hash;
}

export const passwordCompare = async(password:string,hashPassword:string)=>{
    const match = await bcrypt.compare(password,hashPassword)
    return match;
}