
import  jwt  from 'jsonwebtoken';


export const authMiddleware = (req,res,next)=>{
    const bearer = req.headers.authorization
    if(!bearer){
        res.status(401)
        res.json({"message":"not authorized"});
        return 
    }
    const [,token] = bearer.split(" ");
    if(!token){
        res.status(401)
        res.json({"message":"not authorized"});
        return
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
        return 
    }
    catch(e){
        res.status(401)
        res.json({"message":"not authorized"});
        return
    }
}