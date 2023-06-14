import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { password } from "../../../passwords";
import { insertNewUser } from "../../../db/db-utils";


async function handler(req, res) {
    if (req.method === "POST") {
        const email = req.body.email;
        const cart = req.body.cart;
    
        const result = await insertNewUser({email: email, cart: cart})
    
        res.status(201).json({ message: result, email: email });
      }
}

export default handler;
