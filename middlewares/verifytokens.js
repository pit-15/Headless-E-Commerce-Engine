import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import ErrorResponse from "./errorResponse.js";
dotenv.config();

function verifytokens(req,res,next)
{
 const authorizeheadervalue = req.headers.authorization

    if(!authorizeheadervalue)
    {
        throw new ErrorResponse("Missing authorization header value",400);
    }
    
    const [scheme,token] = authorizeheadervalue.split(" ");
    if(scheme!="Bearer" || !token)
    {   
       throw new ErrorResponse("Missing token or Authorization header Value",400);
    }   
    
    
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {id: decoded.id,role: decoded.role,};
     next();

    } 
    catch (err) {
  
    if (err.name === "TokenExpiredError") {
      throw new ErrorResponse("Token has expired, please login again",401);
    }

    if (err.name === "JsonWebTokenError") {
      throw new ErrorResponse("Invalid token",401);
    }
                                                                                                                          
    throw err; 
  }
     
}

export default verifytokens;