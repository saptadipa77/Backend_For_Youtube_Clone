// require('dotenv').config({path: './env'})
import dotenv from "dotenv"

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import {app} from './app.js'
import connectDB from "./db/index.js";

dotenv.config(
    {
        path:'/.env'
    }
)



connectDB()
 .then(()=>{
    app.on("error",(err)=>{
                console.log("ERRR: ",err);
                throw err
            })
    app.listen(process.env.PORT || 8000, ()=>{
     console.log(`Server is running at port :${process.env.PORT}`);
    })
 })
 .catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
 })                     //since we wrote async function for connectDB it also returns promises after execution






// import express from 'express'
// const app=express()
// // function connectDB(){}

// // connectDB() one way of writting

// ( async ()=>{
//  try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error",(error)=>{
//         console.log("ERRR: ",error);
//         throw error
//     })
//     app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
//     })

//  }
//  catch(error){
//     console.error("ERROR: ",error)
//     throw error
//  }
// })()