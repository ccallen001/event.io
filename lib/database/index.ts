import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDb() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing!');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: 'event.io',
      bufferCommands: false
    });

  cached.conn = await cached.promise;

  return cached.conn;
}