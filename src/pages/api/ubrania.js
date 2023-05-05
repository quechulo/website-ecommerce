import { MongoClient } from "mongodb";
import { password } from "../../../passwords";

const DATABASE = "products";

async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://Admindb:${password}@cluster0.bmmwhmg.mongodb.net/?retryWrites=true&w=majority`
  );
}

async function handler(req, res) {
  if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Connection to database failed!" + error.message });
      return;
    }
    try {
      const db = client.db(DATABASE);
      const documents = await db.collection("clothes").find().toArray();
      res.status(201).json({ clothes: documents });
    } catch (error) {
      res.status(500).json({ message: "Reading from database failed!" });
      return;
    }

    client.close();
  }
}

export default handler;
