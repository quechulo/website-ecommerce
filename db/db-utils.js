import { MongoClient } from "mongodb";
const { ObjectId } = require('mongodb');
import { password } from "../passwords";

export async function connectDatabase() {
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
    client.close();
    console.log("reading database failed")
    return;
  }
}

export async function insertNewUser(data) {
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
    const db = client.db("users");
    const query = { email: data.email };
    const result = await db.collection("details").findOne(query);
    if (result) {
      console.log("user already exists")
      res
      .status(300)
      .json({ message: "User already exists" + result });
      return;
    }
  }
  catch (error) {
    console.log("reading collection failed")
    return;
  }
  try {
    const db = client.db("users");
    const result = await db.collection("details").insertOne(data);
    client.close();
    res
      .status(200)
      .json({ message: "User added successfully" + result });
  } catch (error) {
    console.log("reading database failed")
    return;
  }

}

export async function insertProdToCart(userEmail, prodId) {
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
    const db = client.db("users");
    const query = { email: userEmail };
    const result = await db.collection("details").findOne(query);
    
    if (!result) {
      console.log("there is no such user")
      res
      .status(300)
      .json({ message: "there is no such user" + result });
      return;
    }
    const filter = { _id: result._id };
    const update = { $push: { cart: prodId } }; // Replace arrayField and newValue with your specific field and value
    const update_result = await db.collection("details").updateOne(filter, update);
    console.log("update_result: ", update_result)
  }
  catch (error) {
    console.log("reading collection failed")
    return;
  }
  try {
    client.close();
    res
      .status(200)
      .json({ message: "Item added successfully" + result });
  } catch (error) {
    console.log("reading database failed")
    return;
  }

}

export async function loadCartItems(userEmail) {
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
    const db = client.db("users");
    const query = { email: userEmail };
    const result = await db.collection("details").findOne(query);
    if (!result) {
      console.log("there is no such user")
      res
      .status(300)
      .json({ message: "there is no such user" + result });
      return;
    }
    client.close();
    return result.cart;
  } catch (error) {
    return;
  }

}

export async function insertNewOrder(data) {
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
    const db = client.db("orders");
    const result = await db.collection("all_orders").insertOne(data);
    client.close();
    res
      .status(200)
      .json({ message: "Order added successfully" + result });
  } catch (error) {
    console.log("reading database failed")
    return;
  }
}

export async function deleteProdFromCart(userEmail, prodId) {
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
    const db = client.db("users");
    const query = { email: userEmail };
    const result = await db.collection("details").findOne(query);
    
    if (!result) {
      console.log("there is no such user")
      res
      .status(300)
      .json({ message: "there is no such user" + result });
      return;
    }
    const filter = { _id: result._id };
    const update = { $pull: { cart: prodId } }; // Delete specific cart value
    const update_result = await db.collection("details").updateOne(filter, update);
    console.log("update_result: ", update_result)
  }
  catch (error) {
    console.log("reading collection failed")
    return;
  }
  try {
    client.close();
    res
      .status(200)
      .json({ message: "Item deleted successfully" + result });
  } catch (error) {
    console.log("reading database failed")
    return;
  }

}

export async function loadUserOrders(userEmail) {
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
    const db = client.db("orders");
    const query = { email: userEmail };
    const result = await db.collection("all_orders").find(query).toArray();
    client.close();
    return result;
  }
  catch (error) {
    console.log(error.stack, "reading collection failed")
    if (client) {
      client.close()
    }
    return;
  }
}