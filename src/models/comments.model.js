import { sequelize } from "../DB/connectionDB.js";
import {  Model, DataTypes } from "sequelize";



export class Comment extends Model {} 

Comment.init ({

    c_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    c_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:"Users",
            key: "u_id"
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:"Posts",
            key: "p_id"
        }
    }

},{
    sequelize ,
    modelName: 'Comment',
    createdAt: "c_createdAt",
    updatedAt: "c_updatedAt"
});