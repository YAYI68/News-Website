
import multer from 'multer';
import prisma from "../db/prisma";
import cloudinary from  '../utils/cloudinary'


export const getAllPost = async(req,res,next)=>{
    try{
        const blogs = await prisma.post.findMany({
            include:{
                author:{
                    select:{
                        name:true,
                        imageUrl:true,
                }
            }
        }
        })
        res.status(200).json({data: blogs});
    }
    catch(error){
      next(error);
    }
}

export const getOnePost = async(req, res) => {
    try{
      const blog = await prisma.post.findUnique({
        where:{
            id: req.params.id
        },
        include:{
            author:{
                select:{
                    name:true,
                    imageUrl:true,
            }
          },
          comments:true
       }
      })
      res.status(200).json({data: blog})
    }
    catch(error){

    }
     
}

export const createPost = async(req, res) => {
    try{

       const { secure_url: image} = await cloudinary.uploader.upload(req.file.path)
       const { title,content,status } = req.body;
       const blog = await prisma.post.create({
        data:{
            authorId: req.user.id,
            content:content,
            title:title,
            image:image,       // status:status
        }
       })
       res.status(200).json({data: blog})
    }
    catch(error){

    }
}

export const updatePost = async(req, res) => {

    try{
        const { secure_url: image} = await cloudinary.uploader.upload(req.file.path)
        const { title,content,status } = req.body
        console.log({data:{ title,content,image,status }})
        const blog = await prisma.post.update({
            where:{
                author_postId:{
                    id: req.params.id,
                    authorId:req.user.id
                }
            },
            data:{
                title,
                content,
                image: image,
                status: status
            }
        })

        res.status(200).json({data:blog});
    }
    catch(error){

    }

}

export const deletePost = async(req, res) => {
    try{
        const blog = await prisma.post.delete({
            where:{
                author_postId:{
                    id: req.params.id,
                    authorId:req.user.id
                }
            }
        })
        res.status(200).json({data:blog});
    }
    catch(error){

    }

}


export const createComment = async(req, res) => {
    try{
       const { content } = req.body;
       console.log({content})
       const blog = await prisma.comment.create({
        data:{
            authorId: req.user.id,
            postId:req.params.id,
            content:content,      // status:status
        }
       })
       res.status(200).json({data: blog})
    }
    catch(error){

    }
}