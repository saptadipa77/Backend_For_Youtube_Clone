class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack=""
    ){ //overwritting  the constructor
        super(message)                              //line 8 to 13 we have overwritten the constructor
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors = errors

        if(stack)
        {
            this.stack=stack            //this senda an api response to the backend user so that he can identify which files are not correct
        } else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export { ApiError }