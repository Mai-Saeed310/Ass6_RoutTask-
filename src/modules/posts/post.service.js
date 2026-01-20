import { Post } from "../../models/posts.model.js";
import { Comment } from "../../models/comments.model.js";
import { User } from "../../models/users.model.js";
import { sequelize } from "../../DB/connectionDB.js";


export const createPost = async (req,res,next)=>{
    const { p_title, p_content, userId } = req.body;
    // Note: This part is an additional implementation by me for practice (not required in the assignment)
    if (!p_title || !p_content || !userId) {
          return res.status(400).json({ message: "Missing required fields" });
    }
 try {
  
        const post = new Post({p_title,p_content,userId});
        await post.save();

        return res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
 
export const deletePost = async (req,res,next)=>{
 const {postId} = req.params;
 const {userId} = req.body;
try {
        const findPost = await Post.findByPk(postId);
        if (!findPost)
            return res.status(404).json({ message: "Post not found" });

        if (findPost.userId !== userId) {
            return res.status(403).json({ message: "You are not allowed to delete this post" });
        }

        await findPost.destroy(); 
        return res.status(200).json({ message: "Post deleted successfully" });

} catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const details =  async (req, res,next) => {
    try {
        const posts = await Post.findAll({
            attributes: ["p_id", "p_title"],
            // Join
            include: [
                {
                    model: User,
                    attributes: ["u_id", "u_name"]
                },
                {
                    model: Comment,
                    attributes: ["c_id", "c_content"]
                }
            ]
        });

        return res.status(200).json({
            posts
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const countComments = async (req, res,next) => {
    try {

       const posts = await Post.findAll({
         attributes: [
        "p_id",
        "p_title",
        [sequelize.fn("COUNT", sequelize.col("Comments.c_id")), "commentsCount"]
      ],
      include: [
        {
          model: Comment,
          attributes: [] 
        }
      ],

        group: ["Post.p_id"]
});
    return res.status(200).json({ posts });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}