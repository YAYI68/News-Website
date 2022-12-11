
import { commentInputValidator, postCreateValidator,postUpdateValidator } from './../validators/posts';
import { Router } from "express";
import multer from 'multer';
import { createComment, createPost, deletePost, getAllPost, getOnePost, updatePost } from "../handlers/post";
import { authMiddleware } from "../middlewares/auth";


const route = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/post');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage}).single('image');

route.get('/',getAllPost)
route.post('/create',authMiddleware,postCreateValidator,uploadImg,createPost)
route.post('/:id/comment',authMiddleware,commentInputValidator,createComment)
route.get('/:id',getOnePost)
route.put('/update/:id', authMiddleware,postUpdateValidator,uploadImg,updatePost)
route.delete('/delete/:id',authMiddleware,deletePost)

export { route as blogRoute } 


