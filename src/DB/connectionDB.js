
import { Sequelize } from "sequelize";

// Create Connection 
 export const sequelize = new Sequelize  ("ass7_sequaliize","root","root",{
    dialect: "mysql",
    host: "localhost"
}); 

// Test Connection
export const checkConncetionDB = async () => {

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

};

// synchronization
export const checkSyncDB = async () => {

try {
  await sequelize.sync({alter:false, force:false});
console.log('All models were synchronized successfully.');
} catch (error) {
  console.error('Unable to synchronize the database:', error);
}

};



