import mongoose from "mongoose";

const userschema=new mongoose.Schema(
{
    name:{
        type:String,
        required:[true,'username is required'],
        trim:true,
        minLength:2,
        maxLenght:50
    },
    email:{
        type:String,
        required:[true,'user email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, 'please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'user password is required'],
        minLength:6
    }
},
{
    timestamps:true
}
)
const User=mongoose.model('User',userschema);

export default User;