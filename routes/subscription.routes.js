import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createsubscription, getusersubscription } from "../controllers/subscription.controller.js";

const subrouter=Router();

subrouter.get('/',(req,res)=>res.send({title:'get all subscriptions'}))//should be only for admins

subrouter.get('/:id',(req,res)=>{res.send({title:'get subscriptions with this id !'})} )

subrouter.post('/',authorize,createsubscription)

subrouter.put('/:id',(req,res)=>res.send({title:'update the subscriptions'}))

subrouter.delete('/:id',(req,res)=>res.send({title:'delete the subscriptions'}))

subrouter.get('/user/:id',authorize,getusersubscription)//all subscriptions of this user

subrouter.put('/:id/cancel',(req,res)=>res.send({title:'cancel all subscriptions'}))

subrouter.get('/upcoming-renewals',(req,res)=>res.send({title:'upcoming renewals are here !! '}))

export default subrouter;
