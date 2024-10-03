// DATABASE KO CONNECTION

import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/todos_db";

export async function createDBConnection() {
  const db = mongoose.connect(uri);
  return db;
}
