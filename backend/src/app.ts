import express from 'express';
import {Router } from "express";
import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";

import { config}  from 'dotenv' ;
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
import cors from "cors";
config ();

const app = express();
const appRouter = Router() ;
// middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://34.234.64.255"],  // Allow both local and deployed frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove  it in production
app.use(morgan("dev"));



appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats



app.use("/", appRouter);
export default app;