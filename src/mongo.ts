import { MongoClient } from "mongodb";

async function run() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("myDatabase");
    const collection = db.collection("users");

    // Insert a document
    await collection.insertOne({ name: "Ram", age: 25 });

    // Query the document
    const user = await collection.findOne({ name: "Ram" });
    console.log("Found User:", user);
  } finally {
    await client.close();
  }
}

run().catch(console.error);