import Subscription from "../models/subscription.model.js";

export const createsubscription=async (req,res,next)=>{
    try{
        const subscription=await Subscription.create({
            ...req.body,
            user:req.user._id   
        });
        return res.status(201).json({
            success:true,
            data:subscription

        });
    }catch(e){
        next(e);
    }
}

export const getusersubscription=async (req,res,next)=>{
    try{
        if(req.user.id != req.params.id){
            const err=new Error("you are not the owner of this account !! ");
            err.statuscode=401;
            throw err;
        }
        const subscription=await Subscription.find({user:req.params.id});
        return res.status(200).json({
            success:true,
            data:subscription
        });
    }
    catch(error){
        next(error);
    }
}