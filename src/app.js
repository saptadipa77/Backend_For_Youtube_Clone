import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser' //its operation is to access cookies from user's server and perform CRUD operations on it


const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN, //allows few urls
    credentials:true
}))
//below we are configurring so we use app.use in each
app.use(express.json({limit:"16kb"})) //setting configuration using middlewares thats why using app.use , limit means how much server can accept json format
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))  //to store pdfs,files,folders,images    "public" is name of folder
app.use(cookieParser()) //here we also have options to write in cookieparser() but right now they are not of much use


//routes
import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users",userRouter)    //  here v1 is version of api and declaring it is a good practice.
//Here it is a middleware so userrouter gets activated by /users
//it becomes https://localhost:8000/api/v1/users/register , because once control is given to userrouter it goes to that file and gets register url and performs registermethod operation declared in user.controller.js

export { app }