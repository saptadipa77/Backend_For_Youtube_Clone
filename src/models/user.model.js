import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema= new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true           // if we want to make any field searchable in mongodb we make the index 2 . this is an optimised way
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,       //cloudinary url -> its a third party website where we store videos,images etc and they give us an url
            required:true
        },
        coverImage:{
            type:String,      //cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type:String
        }

    },{timestamps:true}
)

//the below function is used to hash the pwd given by user 
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password, 10)
    next()
})
//to check if the bcrypted pwd same as the pwd given by user.So like middlewares  we can also create custom methods
//we can inject any no of methods as our wish
userSchema.methods.isPasswordCorrect=async function   //isPasswordCorrect is a method  , bcrypt also hashes as well as can check
(password){
   return await bcrypt.compare(password,this.password) //this.password is the encrypted password and since it will take time to compare so we will use await

}
     /*Both are jwt tokens
     Tokens are stateless: Authentication tokens are created by an authentication service and contain information that enables a user to verify their identity without entering login credentials. Tokens expire: When a user finishes their browsing session and logs out of the service, the token they were granted is destroyed.
     Access tokens are temporary credentials that grant access to a protected resource, while refresh tokens are used to obtain new access tokens once the current ones expire.
     */ 
userSchema.methods.generateAccessToken = function(){
   return jwt.sign(           //sign method generates the token
    //the below are called payloads which are already stored in mongodb database
    {
        _id:this._id,      //already id stored in mongodb
        email:this.email,
        username:this.username,
        fullName:this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,          //this is the syntax
    //the above access token has an object
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY  
    }
    )
}
//refresh token contains little information
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(           //sign method generates the token
    //the below are called payloads which are already stored in mongodb database
    {
        _id:this._id,      //already id stored in mongodb
        

    },
    process.env.REFRESH_TOKEN_SECRET,          //this is the syntax
    //the above access token has an object
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY  
    }
    ) 
}



export const User=mongoose.model("User",userSchema)