import { Router } from "express"; 
import { createLog, insertLog } from "./log.service.js";


export const logRouter = Router (); 
export const insetLogs = Router (); 

logRouter.post("/",createLog);
        
insetLogs.post("/",insertLog);
