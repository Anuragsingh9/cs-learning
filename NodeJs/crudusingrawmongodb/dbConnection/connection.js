const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = "mongodb://localhost:27017"; // Change if you're using a remote MongoDB
const dbName = process.env.DB; // Your database name
console.log(`db name ${dbName}`)

let dbInstance; // Singleton variable for the database instance

const connectToDatabase = async () => {
    if (dbInstance) {
        return dbInstance; // Return the existing instance if already connected
    }
    try {
        const client = await MongoClient.connect(url);
        dbInstance = client.db(dbName); // Assign the connected db instance to the singleton variable
        console.log(`connected to ${dbName}`);
        return dbInstance;
        // console.log(`Connected to MongoDB: ${dbName}`);
        // dbInstance = client.db(dbName); // Assign the connected db instance to the singleton variable
        return dbInstance;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

module.exports = {
    getDb: async () => {
        if (!dbInstance) {
            // Initialize the connection if not already created
            await connectToDatabase();
        }
        return dbInstance;
    }
};
