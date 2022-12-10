import app from './server'
import * as dotenv from "dotenv"
// import config from './config'

dotenv.config()

app.listen(8500,()=>{
    console.log('localhost running on port 8500')
})