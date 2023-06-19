import { insertNewOrder } from "../../../db/db-utils";

const getRandomStatus = () => {
  const randomValue = Math.random();

  if (randomValue < 0.33) {
    return "Wysłane";
  } else if (randomValue < 0.66) {
    return "W trakcie realizacji";
  } else {
    return "Oczekuje na dostawę";
  }
};

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const products = req.body.products;
    const total = req.body.total;

    const dateOfOrder = new Date();

    const result = await insertNewOrder({
      email: email,
      products: products,
      total: total,
      status: getRandomStatus(),
      dateOfOrder: dateOfOrder,
    });

    res.status(201).json({ message: result, email: email });
  }
}

export default handler;
