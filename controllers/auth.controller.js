import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const SignUp=async (req,res,next)=>{
    // signup logic here
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        // create a new user
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            const err=new Error('user already exists !! ');
            err.statusCode=409;
            throw err;
        }

        // hash a password
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newUsers=await User.create([{name,email,password:hashedpassword}],{session})
        
                                  //payload
        const token=jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true,
            message:'user created sucessfully',
            data:{
                token,
                user:newUsers[0]
            }
        })
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const SignIn=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            const err=new Error("email and password are required");
            err.statusCode=400;
            throw err;
        }

        const user=await User.findOne({email});
        if(!user){
            const err=new Error("Invalid email or password");
            err.statusCode=401;
            throw err;
        }

        const match=await bcrypt.compare(password,user.password);
        if(!match){
            const err=new Error("invalid email or password !!");
            err.statusCode=401;
            throw err;
        }

        const token=jwt.sign(
            {userId:user._id},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
        user.password=undefined;

        res.status(200).json({
            success:true,
            message:"LogIn Successfull!",
            data:{
                token,user
            }
        });

    }catch(error){
        next(error);
    }
}

export const SignOut=async (req,res,next)=>{

}