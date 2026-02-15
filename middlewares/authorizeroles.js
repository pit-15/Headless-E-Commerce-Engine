import ErrorResponse from "./errorResponse.js";

const authorizeroles = (...allowedroles)=>
{
    return (req,res,next)=>
    {
        if(!req.user || !req.user.role)
        {
           throw new ErrorResponse("Unauthorized",401)
        }
        if(!allowedroles.includes(req.user.role))
        {
            throw new ErrorResponse("AcessDenied",403);
        }
        next();
    }
}

export default authorizeroles;