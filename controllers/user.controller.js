import User from "../models/user.model.js";

export const getUsers=async (req,res,next)=>{
    try{   
        const users=await User.find();

        res.status(200).json({
             sucess:true,
             data:users
        })
    }catch(err){
        next(err)
    }
}

export const getUser=async (req,res,next)=>{
    try{   
        const user=await User.findById(req.params.id).select('-password');
        if(!user){
            const err=new Error("user not found!!");
            err.statusCode=404;
            throw err;
            
        }
        res.status(200).json({
             suceess:true,
             data:user
        })
    }catch(err){
        next(err)
    }
}

export const deleteUser=async (req,res,next)=>{
    try{
        const user=await User.findById(req.params.id).select('-password');
        if(!user){
            const err=new Error("this user does not exists!!");
            err.statusCode=404;
            throw err;
        }
        await User.deleteOne({email:user.email});
        res.status(200).json({
            sucess:true,
            data:user
        })
    }
    catch(err){
        next(err);
    }
}