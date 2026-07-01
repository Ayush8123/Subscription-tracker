import { Router } from "express";
import { SignIn, SignOut, SignUp } from "../controllers/auth.controller.js";
const authrouter=Router();

authrouter.post('/sign-up',SignUp)/

authrouter.post('/sign-in',SignIn)

authrouter.post('/sign-out',SignOut)

export default authrouter;