import { Router } from "express"; 
import { createComment, details, findOrCreate, newest, search, updateComment } from "./comment.service.js";


export const CommentRouter = Router (); 

CommentRouter.post("/",createComment);

CommentRouter.patch("/:commentId",updateComment);

CommentRouter.post("/find-or-create",findOrCreate);

CommentRouter.get("/search",search);

CommentRouter.get("/newest/:postId",newest);

CommentRouter.get("/details/:id",details);


