const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/authRouter")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const server = express()
dotenv.config()
server.use(cors())


server.use(express.json())
server.use(cookieParser());

server.use('/api/user', userRouter)
server.use('/api/auth', authRouter)

server.use((err,req,resizeBy,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return resizeBy.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})



mongoose.connect('mongodb://localhost:27017/real-estate')
.then(()=>{
    console.log("Connected to Mongodb")
})
.catch((err)=>{
    console.log(err)
})


server.listen(3000,()=>{
    console.log("server is running on port 3000")
})