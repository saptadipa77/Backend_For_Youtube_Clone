// import {asyncHandler}  from "../utils/asyncHandler.js";
// import {ApiError}       from "../utils/ApiError.js";
// import {User} from    "../models/user.model.js"
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const registerUser=asyncHandler( async(req,res)=>{
//     //get user details from frontend
//     //validation-check if any fields are not empty
//     //check if user already is registered : by username,email
//     //check for images ,check for avatar
//     //upload them to cloudinary,avatar
//     //create user object - create entry in db
//     //remove password and refresh token field from response
//     //check for user creation
//     //return response
//     // ------THIS IS CALLED LOGIC BUILDING--------
//     //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//     //since now we don't have frontend part we will get details from thunder client/postman

//     const{fullName,email,username,password} = req.body      //this line brings data from frontend's body
//     // console.log("email:",email);
//     // console.log("password:",password);

//     // if(fullName==="")
//     // {
//     //     throw new ApiError(400,"fullname is required")

//     // }
//     //-----------------//
//     //we can check all the fields altogether like below
//     if(
//         [fullName,email,username,password].some((field)=> //some can accept upto 3 parameters 
//         field?.trim()===" ")     //checking if any field is empty even after trimming down the spaces (equivalent to ? : of c++ syntax)
//         ){
//             throw new ApiError(400,"All fields are required")  //400 is statuscode for throwing error
//         }
      
//         const existedUser = await User.findOne({
//             $or:[{username},{email}]       //syntax to find whether username or email exists or not
//         })

//         if(existedUser)
//         {
//         throw new ApiError(409,"User with email or username already exists")
//         }

//         const avatarLocalPath = req.files?.avatar[0]?.path;       //since we have used middleware in routes maltar gives few more access with request. as express gave access to request for body similarly multer gives access to request for files
//         const coverImageLocalPath = req.files?.coverImage[0]?.path;  //we are taking the first property(if exists) for both the cases of images and if exists ,it returns a path

//         if(!avatarLocalPath)
//         {
//             throw new ApiError(400,"Avatar file is required");
//         }

//       const avatar =  await uploadOnCloudinary(avatarLocalPath)
//       const coverImage = await uploadOnCloudinary(coverImageLocalPath)
//       if(!avatar)
//       {
//         throw new ApiError(400,"Avatar file is required")
//       }

//      const user = await User.create({
//         fullName,
//         avatar:avatar.url,
//         coverImage:coverImage?.url || "",
//         email,
//         password,
//         username:username.toLowerCase()

//       })

//      const createdUser = await User.findById(user._id).select(
//         "-password -refreshToken"
//      )
    
//      if(!createdUser){
//         throw new ApiError(500,"Something went wrong while registering the user")
//      }
//      return res.status(201).json(
//         new ApiResponse(200,createdUser,"user registered successfully")
        
//      )

// })

// export { registerUser }
import {asyncHandler}  from "../utils/asyncHandler.js";
import {ApiError}       from "../utils/ApiError.js";
import {User} from    "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler( async(req,res)=>{
    //get user details from frontend
    //validation-check if any fields are not empty
    //check if user already is registered : by username,email
    //check for images ,check for avatar
    //upload them to cloudinary,avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response
    // ------THIS IS CALLED LOGIC BUILDING--------
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //since now we don't have frontend part we will get details from thunder client/postman

    const{fullName,email,username,password} = req.body
    // console.log("email:",email);
    // console.log("password:",password);

    // if(fullName==="")
    // {
    //     throw new ApiError(400,"fullname is required")

    // }
    //we can check all the fields altogether
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
        ){
            throw new ApiError(400,"All fields are required")  //400 is statuscode for throwing error
        }
      
        const existedUser = await User.findOne({
            $or:[{username},{email}]       //syntax to find whether username or email exists or not
        })

        if(existedUser)
        {
        throw new ApiError(409,"User with email or username already exists")
        }

       // console.log('req.files:', JSON.stringify(req.files, null, 2));
       //console.log(req.files);

        //const avatarLocalPath = req.files?.avatar[0]?.path;
        let avatarLocalPath;
        if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length>0)
        {
            avatarLocalPath=req.files.avatar[0].path
        }
       // const coverImageLocalPath = req.files?.coverImage[0]?.path;
        let coverImageLocalPath;
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0)
        {
            coverImageLocalPath=req.files.coverImage[0].path
        }
      //   if(!avatarLocalPath)
      //   {
      //       throw new ApiError(400,"Avatar file is required");
      //   }

      const avatar =  await uploadOnCloudinary(avatarLocalPath)
      const coverImage = await uploadOnCloudinary(coverImageLocalPath)
      // if(!avatar)
      // {
      //   throw new ApiError(400,"Avatar file is required")
      // }
      


     const user = await User.create({
        fullName,
        avatar:avatar?.url || "",
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

      })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )
    
     if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
     }
     return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
        
     )

})

export { registerUser }