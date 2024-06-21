import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"     //fs is file system. it is already coming by default with node js , we can read write file,open directories,path etc

//copied the syntax from cloudinary website
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET //since these all are confidential so these are stored in .env
});

//uploading files
const uploadOnCloudinary = async (localFilePath)=>{      //here localfilepath is passed as a parameter. it is the localfile path of our system where by using multer we store the files temporarily before uploading it on cloudinary
    try{
        if(!localFilePath) return null
        //upload the file on cloudinary
       const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"   //auto means detect yourself what type of file is coming whether image or video or what
       })
       //file has been uploaded successfully
       console.log("file is uploaded on cloudinary",response.url);
       return response;
    }catch(error)
    {
        fs.unlinkSync(localFilePath)   //remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

export {uploadOnCloudinary}