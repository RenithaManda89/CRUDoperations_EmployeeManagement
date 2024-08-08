import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Missing environment variable: MONGODB_URI');
}

let cachedClient = null;
let cachedDb = null;

async function dbConnect() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cachedDb = cachedClient.connection;
  return cachedDb;
}

export default dbConnect;
