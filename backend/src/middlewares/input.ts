import { validationResult } from 'express-validator'

export const inputErrorHandler = (req,res,next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({message:errors.array()})
    }
    else{
        next();
    }
}