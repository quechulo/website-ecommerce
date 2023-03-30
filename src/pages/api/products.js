import { MongoClient } from "mongodb";
import { password } from "../../../passwords";

const DATABASE = 'products';

async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://Admindb:${password}@cluster0.bmmwhmg.mongodb.net/${DATABASE}?retryWrites=true&w=majority`
  );
}

async function insertDocument(client, document) {
  const db = client.db();

  const documents = await db
    .collection("emails")
    .find({ email: document.email })
    .toArray();

  if (documents.length < 1) {
    await db.collection("emails").insertOne(document);
  } else {
    throw Error( "Email already in use: " + document.email );
  }
}

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed!" });
      return;
    }

    try {
      await insertDocument(client, { email: email });
      res.status(201).json({ message: 'Signed up!' })
      
    } catch (error) {
      if (error.message) {
        res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: "Inserting failed!" });
      return;
    }
    client.close();
  }

  if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed!" });
      return;
    }
    try {
      const db = client.db();
      const documents = await db.collection("shoes").find().toArray();
      res.status(201).json({ shoes: documents });
    } catch (error) {
      res.status(500).json({ message: "Reading from database failed!" });
      return;
    }

    client.close();
  }
}

export default handler;