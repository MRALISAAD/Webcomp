const mongoose = require('mongoose');

async function connectDB(uri, options = {}) {
  if (!uri) throw new Error('MONGODB_URI is not defined');
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  await mongoose.connect(uri, { ...defaultOptions, ...options });
  console.log('✅ MongoDB connected');
  return mongoose.connection;
}

module.exports = connectDB;
