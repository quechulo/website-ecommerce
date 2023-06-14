import { insertProdToCart } from "../../../db/db-utils";

async function handler(req, res) {
    if (req.method === "POST") {
        const email = req.body.email;
        const productId = req.body.productId;
    
        const result = await insertProdToCart(email, productId)
    
        res.status(201).json({ message: result, email: email });
      }
}

export default handler;