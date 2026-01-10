import express from "express";
import cors from 'cors'
import userRouter from './routes/user.route.js'
import pinRouter from './routes/pin.route.js'
import commentRouter from './routes/comment.route.js'
import boardRouter from './routes/board.route.js'
import dotenv from 'dotenv'
import connectDB from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))
app.use(cookieParser())
app.use(fileUpload())
// app.use(fileUpload({
    //     useTempFiles:true,
    //     tempFileDir:"/tmp/"
    // }))

// app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter)
app.use("/pins", pinRouter)
app.use("/comments", commentRouter)
app.use("/boards", boardRouter)

 
app.listen(5000, ()=> {
    connectDB()
console.log("Listening in port 5000")
})