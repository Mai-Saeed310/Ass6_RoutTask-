import { Router } from "express"; 
import { createAuthers} from "./auther.service.js";


export const autherRouter = Router (); 

autherRouter.post("/",createAuthers);




