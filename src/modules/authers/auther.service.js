import { db } from "../../DB/connectionDB.js";



export const createAuthers = async (req, res) => {
try {

    const auther = await db.collection("authors").insertOne(req.body);

    res.status(201).json({
      message: "Authors collection created successfully",
      author: auther
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}