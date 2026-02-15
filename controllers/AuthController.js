import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncHandler from "../utils/asyncHandler.js"
import dotenv from "dotenv"
import ErrorResponse from "../middlewares/errorResponse.js"
dotenv.config();

export const register = asyncHandler(async (req,res)=>
{
   
        const {username,email,password,role}=req.body;

        if(!username) {
            throw new ErrorResponse("Username is required",400);
        }

        if(!email){  
            throw new ErrorResponse("Email is requires",400);
        }

        if(!password) {
            throw new ErrorResponse("Password is required",400);
        }

        const existinguser=await User.findOne({email});
        if(existinguser)
        {
            throw new ErrorResponse("User already Exits",409);
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const newuser = new User({username,email,password:hashedpassword,role});
        await newuser.save();

        res.status(201).json({message:"User Created Successfully!"});
}
    
)

export const login = asyncHandler(async(req,res)=>

    {
   
    // accepting both username or email so one can login via his comfortability

        const { username,email,password }=req.body

        if(!password) 
        {
         throw new ErrorResponse("Please Enter Password",400); 
        }

        let user;

        if(username)
        {
            user = await User.findOne({username});
        }
        else if(email)
        {
            user = await User.findOne({email});
        }
        else
        {
           throw new ErrorResponse("Username or Email is required",400)
        }

        if(!user)
        {
          throw new ErrorResponse("User doesn't exist",409);
        
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            throw new ErrorResponse("Invalid Password",401);
        }

        //JWT
        const payload ={
            id:user.id,
            role:user.role
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
        
        res.status(201).json({message:"Login Successfull",token});
    } 
   
  )
