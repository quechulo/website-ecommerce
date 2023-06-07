import { MongoClient } from "mongodb";
const { ObjectId } = require('mongodb');
import { password } from "../passwords";

async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://Admindb:${password}@cluster0.bmmwhmg.mongodb.net/?retryWrites=true&w=majority`
  );
}

export async function findProductById(id, collection, database) {
  let client;
  const objectId = new ObjectId(id);

  try {
    client = await connectDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Connection to database failed!" + error.message });
    return;
  }
  try {
    const db = client.db(database);
    const result = await db.collection(collection).findOne({ _id: objectId });
    client.close();
    return result
  } catch (error) {
    console.log("reading database failed")
    return;
  }

  client.close();
}
