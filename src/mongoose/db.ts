// DATABASE KO CONNECTION

import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/todos_db";

async function createDBConnection() {
  const db = mongoose.connect(uri);
  return db;
}

createDBConnection().then(
    (db) => console.log("connected to db", db)
).catch((err)=>{
    console.error("Failed To Connect To db",err);
})
