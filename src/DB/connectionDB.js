import { MongoClient } from "mongodb";

// Create Connection 
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Create DB 
// Database Name
const dbName = "myAss7";
export let db;

export const checkConncetionDB = async () => {
  try {
    // Test Connection
    await client.connect();
    console.log("Connection has been established successfully.");

    db = client.db(dbName);
  } catch (error) {
    console.error("Unable to connect to the server:", error);
  }
};


