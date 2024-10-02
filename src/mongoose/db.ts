// DATABASE KO CONNECTION

import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/todos_db";

async function createDBConnection() {
  const db = mongoose.connect(uri);
  return db;
}
