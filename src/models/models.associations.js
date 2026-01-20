import { Comment } from "./comments.model.js";
import { User } from "./users.model.js";
import { Post } from "./posts.model.js";



// User ↔ Post
User.hasMany(Post, {
    foreignKey: "userId"
});

Post.belongsTo(User, {
    foreignKey: "userId"
});

// Post ↔ Comment
Post.hasMany(Comment, {
    foreignKey: "postId"
});

Comment.belongsTo(Post, {
    foreignKey: "postId"
});

// User ↔ Comment
User.hasMany(Comment,{
    foreignKey: "userId"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});