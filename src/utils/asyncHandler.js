// this format is used for promise format 
const asyncHandler=(requestHandler)=>{
     return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))       //we can write reject or catch         
    }
}


export {asyncHandler}
 
//the below code is the format for how to write in try catch block

// const asyncHandler=(fn)=> async  (req,res,next)=>{    //higher order function

//     try{
//         await fn(req,res,next)
//     } catch(error){
//         res.status(err.code || 500).json({            //error code passed by user
//             success:false,
//             message:err.message
//         })          
//     }
// }     