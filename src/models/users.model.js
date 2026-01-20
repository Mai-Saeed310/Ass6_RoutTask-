import { sequelize } from "../DB/connectionDB.js";
import { DataTypes } from "sequelize";



export const User = sequelize.define("User",{
    u_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    u_name: {
       type: DataTypes.STRING,
       allowNull: false
    },

    u_email: {
       type: DataTypes.STRING,
       unique: true,
       allowNull: false,
       validate: {isEmail: true}
    },

    u_password:{
        type: DataTypes.STRING,
        allowNull: false,
         validate: {      
            checkPasswordLength(value){
            if(value.length <= 6 ){
                throw new Error("Password must be greater than 6 characters");
            }
        }}
    },

    u_role: DataTypes.ENUM ("user", "admin")
},
{
  createdAt: "u_createdAt",
  updatedAt: "u_updatedAt"
}

);

User.beforeCreate("checkNameLength",(user)=> {
    if (user.u_name.length <= 2) {
    throw new Error("User name must be greater than 2 characters");
  }
});