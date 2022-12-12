import { Router } from "express";
import multer from 'multer';
import { allUser, signIn, signUp, singleUser, updateProfile } from "../handlers/user";
import { authMiddleware } from "../middlewares/auth";
import { inputErrorHandler } from "../middlewares/input";
import { userLoginvalidator, userProfileValidator, userRegisterValidator } from "../validators/user";


const route = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/user');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// const upload = multer({ dest: 'uploads/' })
// // const upload = multer({ dest: './src/uploads/'});
// const uploadImg = upload.single('photo');

const uploadImg = multer({storage}).single('image');

route.get('/',allUser)
route.get('/:username',singleUser)
route.post('/register',userRegisterValidator,inputErrorHandler,uploadImg,signUp)
route.post('/login',userLoginvalidator,inputErrorHandler,signIn)
route.put('/update/:username',authMiddleware,uploadImg,updateProfile)

export  {route as userRoute}  ;