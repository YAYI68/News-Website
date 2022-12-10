import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const hashPassword = (password)=>{
    return bcrypt.hash(password,5)
}

export const  verifyPassword =(password,hasPassword)=>{
    return bcrypt.compare(password,hasPassword)
}



export const  createJWT = (user)=>{
    const token = jwt.sign({id:user.id, name:user.name }, process.env.JWT_SECRET);
    return token;
}