import { db } from "../DB/connectionDB.js";


// Create model (collection)

const autherModel = db.createCollection("auther");

export default autherModel ; 