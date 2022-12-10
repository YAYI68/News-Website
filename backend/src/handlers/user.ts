
import { nextTick } from "process";
import prisma from "../db/prisma";
import { createJWT, hashPassword, verifyPassword } from "../utils/auth";
import cloudinary from "../utils/cloudinary";


export const signUp = async(req, res,next) => {

    try{
    const { name, email, password} =  req.body;
    const username= '@' + name.replace(/\s/g,'');
    const hash = await hashPassword(password)
    const user = await prisma.user.create({
        data:{
            username:username,
            name:name,
            email:email,
            password:hash
        },
        select:{
            id:true,
            username:true,
            name:true,
            email:true
        }
    })
    const token = createJWT(user)
    res.status(201).json({data:{...user,token}})
    }
    catch(error){
        res.json({error: error})
        next(error);
    }
 
}

export const  signIn = async(req, res,next) => {

    try{
        const { email, password } = req.body
        const user = await prisma.user.findUnique({
            where:{
                email:email,
            },
            select:{
               id: true,
               createdAt: true,
               username: true,
               name: true,
               email:  true,
               password: true,
            }
        })
        const isValid = await verifyPassword(password,user.password)
        if(!isValid){
            res.status(403).json({message : "Invalid email address/password "});
            return
        }
        const token = createJWT(user)
       return res.status(201).json({data:{...user,token}})
    }
    catch(error){
        res.json({error: error})
         next(error)
    }

}


export const allUser = async(req, res,next)=>{
    try{
        const users = await prisma.user.findMany({
            select:{
                username:true,
                name:true,
                email:true,
                imageUrl:true,
                description:true,
                occupation:true,
            }
        })
        res.status(200).json({data:users})
    }
    catch(error){
        res.json({error: error})
        next(error)
    }
}

export const singleUser = async(req, res,next)=>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                username: req.params.username
            },
           select:{
            username:true,
            imageUrl:true,
            description:true,
            occupation: true,
            posts:true,
           },
        })
        return res.status(200).json({data:user})
    }
    catch(error){
        res.json({error: error})
        next(error)
    }
}

export const updateProfile = async(req, res,next)=>{
    try{
        const { secure_url: image} = await cloudinary.uploader.upload(req.file.path)
        const { name,email,username,description,occupation } = req.body;
        const user = await prisma.user.update({
            where:{
                id:req.user.id,
                username:req.params.username
            },
            data:{
                name:name,
                email:email,
                imageUrl:image,
                description:description,
                occupation:occupation,         
            }
        })
        res.status(201).json({data:user})
    }
    catch(error){
        res.json({error: error})
        next(error)
    }
}