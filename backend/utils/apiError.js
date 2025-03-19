class ApiError extends Error{
    constructor({message='something went wrong',status=500,success=false}){
        super(message)
        this.status=status
        this.success=success
    }
}

export {ApiError}