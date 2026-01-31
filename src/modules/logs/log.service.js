import { db } from "../../DB/connectionDB.js";
import { ObjectId } from "mongodb";


export const createLog = async (req,res,next)=>{
    
 try {
      // check if the collection is already exist or not 
    const collections = await db.listCollections({ name: "logs" }).toArray();
       if (collections.length > 0) {
      return res.status(200).json({
        message: "Logs collection already exists"
      });
    }
    await db.createCollection("logs", {
      capped: true,      // Create capped collection
      size: 1024 * 1024  // 1MB = 1024 * 1024 bytes
    });

      res.status(201).json({
      message: "Capped logs collection created successfully"
    });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const insertLog = async (req,res,next)=>{
    
 try {
    const logData = { ...req.body };
// convert book_id to object 
      logData.book_id = new ObjectId(logData.book_id);
    
    const log = await db.collection("logs").insertOne(logData);

    res.status(201).json({
      message: "Log inserted successfully",
      logId: log.insertedId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};