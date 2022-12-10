
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser  from 'body-parser';
import cookieParser  from 'cookie-parser';
import { userRoute }  from './routers/user';
import { blogRoute } from './routers/post';
import { authMiddleware } from './middlewares/auth';

const app = express();

app.use(cors());
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(express.static("static"));


app.get("/", (req, res) => {

  });

 
app.use('/api/user',userRoute)
app.use('/api/post',blogRoute)
app.use('/post/image', express.static('./uploads/post'));
// app.use('/uploads/author', express.static('./uploads/post'));
app.use((err, req, res,next)=>{
  console.log(err)
  res.json({error: err.message })
})

export default app







// const http = require('http');

// const server = http.createServer((req,res)=>{
//     res.write(JSON.stringify({
//         data:'Hello world from http'
//     }))

//     res.end()

// })

// module.exports={server}