import { sequelize } from "../DB/connectionDB.js";
import {  Model, DataTypes } from "sequelize";



export class Post extends Model {} 

Post.init ({

    p_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    p_title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    p_content: {
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
    }

},{
    sequelize ,
    modelName: 'Post',
    createdAt: "p_createdAt",
    updatedAt: "p_updatedAt",
    paranoid: true   
});