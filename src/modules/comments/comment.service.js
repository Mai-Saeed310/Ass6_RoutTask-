import { Comment } from "../../models/comments.model.js";
import { Op } from "sequelize";
import { User } from "../../models/users.model.js";
import { Post } from "../../models/posts.model.js";


export const createComment = async (req,res,next)=>{
   try {
         const { comments } = req.body;
    // Note: This part is an additional implementation by me for practice (not required in the assignment)
          if (comments.length === 0) {
            return res.status(400).json({
                message: "No comments to add"
            });
        }
        const createComment = await Comment.bulkCreate(comments);
        return res.status(201).json({
            message: "Comments created successfully",
            comments: createComment
        });
   } catch (error) {
    return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
   }

}

export const updateComment = async (req,res,next)=>{
    const {commentId} = req.params;
    const {userId,content}= req.body;
    const findComment = await Comment.findByPk(commentId);
   try {
        if (!findComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        if (findComment.userId !== userId) {
            return res.status(403).json({ message: "You are not allowed to update this comment" });
        }
        findComment.set({
        c_content: content
        });

        await findComment.save();
         return res.status(200).json({ 
            message: "Comment updated successfully"  
        });

   } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
   }

}

export const findOrCreate = async (req,res,next)=>{
    const { postId, userId, c_content } = req.body;
    // Note: This part is an additional implementation by me for practice (not required in the assignment)
    if (!postId || !userId || !c_content) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

   try {
        const [comment, created] = await Comment.findOrCreate({
            where: {
                postId,
                userId,
                c_content
            },
            defaults: {
                postId,
                userId,
                c_content
            }
        });

        return res.status(200).json({
            message: created ? "Comment created" : "Comment already exists",
            comment,
            created 
        });
   } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
   }

}

export const search = async (req,res,next)=>{
    const { word  } = req.query;
    // Note: This part is an additional implementation by me for practice (not required in the assignment)
    if (!word) {
            return res.status(400).json({ message: "Missiing search word" });
        }

   try {
      const result = await Comment.findAndCountAll({
            where: {
                c_content: { [Op.like]: `%${word}%` } 
            }
        });
         if (result.count === 0) {
            return res.status(404).json({
                message: "No comments found"
            });
        }

        return res.status(200).json({
            count: result.count,
            comments: result.rows
        });
   } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
   }

}

export const newest = async (req,res,next)=>{
    const { postId } = req.params;

    try {
        const comments = await Comment.findAll({
            where: { postId },
            order: [["c_createdAt", "DESC"]], 
            limit: 3 
        });

        if (comments.length === 0) {
            return res.status(404).json({
                message: "No comments found "
            });
        }

        return res.status(200).json({
            comments
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const details = async (req,res,next)=>{
    const { id } = req.params;
    try {
        const comment = await Comment.findByPk(id, {
            attributes: ["c_id", "c_content"],
            include: [
                {
                    model: User,
                    attributes: ["u_id", "u_name","u_email"]
                },
                {
                    model: Post,
                    attributes: ["p_id", "p_title","p_content"]
                }
            ]
        });

        if (!comment) {
            return res.status(404).json({
                message: "no comment found"
            });
        }

        return res.status(200).json({
            comment
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}