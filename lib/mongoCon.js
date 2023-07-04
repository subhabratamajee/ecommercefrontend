import mongoose from 'mongoose'
// mongoose.set('bufferCommands', false);
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}
// global.mongoose.set('bufferCommands', false);
async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      //  await mongoose.set('bufferCommands', false)
      // useMongoClient: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
    }

    cached.promise = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    })
  }
  cached.conn = await cached.promise
  return cached.conn;
}

export default dbConnect