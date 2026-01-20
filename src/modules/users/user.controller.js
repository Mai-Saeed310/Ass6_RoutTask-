import { Router } from "express"; 
import { createOrDelete, getByEmail, getById, signup } from "./user.service.js";

export const userRouter = Router (); 


userRouter.post("/signup",signup);

userRouter.put("/:id",createOrDelete);

userRouter.get("/by-email",getByEmail);

userRouter.get("/:id",getById);