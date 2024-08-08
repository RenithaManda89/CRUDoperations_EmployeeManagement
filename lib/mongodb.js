import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection string
const client = new MongoClient(uri);

let db = null;

export async function connectToDatabase() {
  if (db) return { db, client };

  try {
    await client.connect();
    db = client.db(process.env.MONGODB_DB); // MongoDB database name
    return { db, client };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export { ObjectId };
