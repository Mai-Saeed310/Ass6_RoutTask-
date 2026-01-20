import express from "express";
import { checkConncetionDB, checkSyncDB } from "./DB/connectionDB.js";
import { userRouter } from "./modules/users/user.controller.js";
import { postRouter } from "./modules/posts/post.controller.js";
import { CommentRouter } from "./modules/comments/comment.controller.js";
import "./models/models.associations.js";

const app = express(); 
const port = 3000 ; 


const bootstrap = () => { 
    checkConncetionDB(); 
    checkSyncDB();
    app.use(express.json());
    app.use("/users",userRouter);
    app.use("/posts",postRouter);
    app.use("/comments",CommentRouter);

    app.get("/", (req,res)=>{
    res.status(200).send("Let's start our Ass7 ");
    });

    app.use("{/*demo}",(req,res)=>{
        res.status(404).send(`This page ${res.originalUrl} Not found`);
    });

    app.listen(port,()=>{
        console.log(`Server is running on ${port}`);
    });
};



export default bootstrap ; 