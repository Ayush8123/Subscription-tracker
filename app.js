import express from "express"
import {PORT} from './config/env.js'

import userrouter from "./routes/user.routes.js"
import subrouter from "./routes/subscription.routes.js"
import authrouter from "./routes/auth.routes.js"
import connecttodatabase from "./DATABASE/mongodb.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import cookieParser from "cookie-parser"
import arcjetmiddleware from "./middlewares/arcjet.middleware.js"

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetmiddleware);
const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/auth`, authrouter);
app.use(`${API_VERSION}/users`, userrouter);
app.use(`${API_VERSION}/subscriptions`, subrouter);

app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send("Welcome to subscription tracker API !!")
})

const startServer = async () => {
  try {
    await connecttodatabase(); 
    app.listen(PORT, () => {
      console.log(
        `subscription tracker API is running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app; 