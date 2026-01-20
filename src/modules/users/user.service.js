import { User } from "../../models/users.model.js";

export const signup = async (req, res, next)=>{
    const { u_name, u_email, u_password, u_role } = req.body;
 try {
    
    const query = await User.findOne({where: {u_email: u_email}});

    if (query) {
        return res.status(409).json({ message: "Email already exists" });
    }
        const user = User.build({
        u_name,
        u_email,
        u_password,
        u_role
        }
    );
        await user.save();
        return res.status(201).json({ message:  "User created successfully" ,user});

 } catch (error) {
    // handle validation errors
   if (error.name === "SequelizeValidationError"){
       return res.status(400).json({ error });
}
       return res.status(500).json({ message: error.message });
 }
}

export const createOrDelete = async (req, res, next)=>{
    const {id} = req.params ; 

try {
    const {u_name,u_email,u_password,u_role}= req.body ; 
    const [user, created] = await User.upsert({
            u_id:id,         
            u_name,
            u_email,
            u_password: String(u_password),
            u_role
        },{validate:false});

        if (!created) {
            return res.status(200).json({
                message: "User updated successfully",
                user
            });
        }
        return res.status(201).json({
            message: "User created successfully",
            user
        });
} catch (error) {
    return res.status(500).json({ message: error.message });
}
}

export const getByEmail = async (req, res, next)=>{
    const {u_email} = req.query ; 
try {
 const user = await User.findOne({ where: { u_email: u_email }, attributes: { exclude: ["u_password"] }});
  if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({ user });
} catch (error) {
        return res.status(500).json({ message: error.message });

}
}

export const getById = async (req, res, next)=>{
    const {id} = req.params ; 
try {
 const user = await User.findByPk(id, {attributes: { exclude: ["u_password","u_role"] }});
  if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({ user });
} catch (error) {
        return res.status(500).json({ message: error.message });

}
}