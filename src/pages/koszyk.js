import ProductItem from "@/components/products/ProductItem/ProductItem";
import { Fragment, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { findProductById, loadCartItems } from "../../db/db-utils";
import styles from "@/styles/koszyk.module.css";

const Koszyk = (props) => {
  let { products } = props;
  const [actualProducts, setActualProducts] = useState(products);
  const [sumToPay, setSumToPay] = useState(0);
  const [logedUserEmail, setLogedUserEmail] = useState(null);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      handleSumToPay();
      setLogedUserEmail(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, user, actualProducts]);

  const handleSumToPay = () => {
    let sum = 0;
    for (const prod of actualProducts) {
      sum += parseFloat(prod.price.replace(",", "."));
    }
    setSumToPay(sum);
    console.log("sum: ", sum);
  };

  const handleRemoveItem = (productId) => {
    console.log("productId: ", productId);
    setActualProducts(actualProducts.filter((prod) => prod._id !== productId));
    handleRemoveProductFromCartDb(productId);
  };

  const handleRemoveProductFromCartDb = (productId) => {
    fetch(`/api/removeCartProdDb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logedUserEmail,
        productId: productId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMakeOrder = () => {
    const prodIds = products.map((prod) => prod._id);
    fetch(`/api/makeOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "fecosen627@anwarb.com",
        products: prodIds,
        total: sumToPay,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // products = [];
  };

  return (
    <Fragment>
      <h1>Koszyk</h1>
      <div className={styles.cartList}>
        {actualProducts.map((product) => (
          <div className={styles.oneCartItem}>
            <ProductItem
              key={product._id}
              product={product}
              onProductClick={() => {}}
            />
            <button
              id={styles["remove-btn"]}
              onClick={() => handleRemoveItem(product._id)}
            >
              usuń
            </button>
          </div>
        ))}
        <button id={styles["make-order-btn"]} onClick={handleMakeOrder}>
          Złóż zamówienie
        </button>
        <h4>Podsumowanie: {sumToPay} PLN</h4>
      </div>
    </Fragment>
  );
};

export async function getServerSideProps() {
  const prods = await loadCartItems("fecosen627@anwarb.com");
  let products = [];
  for (const prod_id of prods) {
    let product = await findProductById(prod_id, "shoes", "products");
    if (!product) {
      let product = await findProductById(prod_id, "clothes", "products");
    }
    if (product) {
      product._id = product._id.toString().slice("ObjectId(");
      products.push(product);
    }
  }

  return {
    props: {
      products: products,
    },
  };
}

export default Koszyk;
