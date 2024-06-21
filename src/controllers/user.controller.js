import {asyncHandler}  from "../utils/asyncHandler.js";

const registerUser=asyncHandler( async(req,res)=>{
    return res.status(200).json(         //this status code is http code which is sent on registering successfully
        {    
        message:"chai aur code"
        }
    )
})

export { registerUser }