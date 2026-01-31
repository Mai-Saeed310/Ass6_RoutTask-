import express from "express";
import { checkConncetionDB } from "./DB/connectionDB.js";
import { bookRouter, createCollection } from "./modules/books/book.controller.js";
import { autherRouter } from "./modules/authers/auther.controller.js";
import { insetLogs, logRouter } from "./modules/logs/log.controller.js";


const app = express(); 
const port = 3000 ; 


const bootstrap = () => { 
    checkConncetionDB(); 

    app.use(express.json());
    app.use("/collection/books",createCollection);
    app.use("/collection/authors",autherRouter);
    app.use("/collection/logs/capped",logRouter);
    app.use("/books",bookRouter);
    app.use("/logs",insetLogs);

    

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