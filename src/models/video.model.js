import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Schema } from "mongoose";
const videoSchema=new Schema(
    {
        videoFile:{
            type:String,     //cloudinary url
            required:true,
        },
        
        thumbnail:{
            type:String,     //cloudinary url
            required:true
        },
        title:{
            type:String,     //cloudinary url
            required:true
        },
        description:{
            type:String,     //cloudinary url
            required:true
        },
        duration:{
            type:Number,            //this information will also be obtained from cloudinary url
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }

    },
    {timestamps:true}
)

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video",videoSchema)