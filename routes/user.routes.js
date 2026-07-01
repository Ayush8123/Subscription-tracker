import { Router } from "express";
import { getUser, getUsers,deleteUser} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userrouter=Router();

userrouter.get('/',authorize,getUsers);

userrouter.get('/:id',authorize ,getUser);//only authorized user can see their info

userrouter.post('/',(req,res)=>res.send({title:'create a user'}))

userrouter.put('/:id',(req,res)=>res.send({title:'update a user'}))

userrouter.delete('/:id',deleteUser)

export default userrouter;