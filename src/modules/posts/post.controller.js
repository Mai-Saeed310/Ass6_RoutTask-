import { Router } from "express"; 
import { countComments, createPost, deletePost, details } from "./post.service.js";


export const postRouter = Router (); 

postRouter.post("/",createPost);
        
postRouter.delete("/:postId",deletePost);

postRouter.get("/details",details);

postRouter.get("/comment-count", countComments);