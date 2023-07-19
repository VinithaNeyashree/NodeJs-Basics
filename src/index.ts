import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import InitiateMongoServer from "../src/db/mongoose";
dotenv.config();

//// Import User Routes ////
import userRoutes from '../src/router/user';
/////Import Blog Routes//////
import blogRoutes from "../src/router/blog";

import uploadRoutes from "../src/router/upload";
const app = express();
const port = process.env.PORT || 3012;
InitiateMongoServer()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//User Router Initialize////
app.use("/api/users",userRoutes);
/////// Blog Router Initialize //////
app.use("/api/blogs",blogRoutes);
app.use("/api/upload",uploadRoutes);
////Server Initialize////
app.get("/api", (req, res) => {
    res.send("Welcome");
  });
  
  app.listen(port, () => {
    console.log("server is up on " + port);
  });