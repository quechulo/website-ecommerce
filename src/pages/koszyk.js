import ProductItem from "@/components/products/ProductItem/ProductItem";
import { Fragment, useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import {
  findProductById,
  loadCartItems,
  loadUserOrders,
} from "../../db/db-utils";
import styles from "@/styles/koszyk.module.css";
import Loading from "@/components/helpers/Loading";

import { UserContext } from "../../src/pages/_app";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";

const Koszyk = (props) => {
  let { products, orders, serverUserEmail } = props;
  const [actualProducts, setActualProducts] = useState(products);
  const [sumToPay, setSumToPay] = useState(0);
  const { isLoaded, isSignedIn, user } = useUser();
  const { userEmail, setUserEmail } = useContext(UserContext);

  useEffect(() => {
    if (isLoaded && user) {
      handleSumToPay();
      setUserEmail(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, user, actualProducts, setUserEmail]);

  const handleSumToPay = () => {
    let sum = 0;
    for (const prod of actualProducts) {
      sum += parseFloat(prod.price.replace(",", "."));
    }
    setSumToPay(sum);
    console.log("sum: ", sum);
  };

  const handleRemoveItem = (productId) => {
    console.log("Removed productId: ", productId);
    setActualProducts(actualProducts.filter((prod) => prod._id !== productId));
    products = products.filter((prod) => prod._id !== productId);
    handleRemoveProductFromCartDb(productId);
  };

  const handleRemoveProductFromCartDb = (productId) => {
    fetch(`/api/removeCartProdDb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
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
        email: userEmail,
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
    for (const prod of products) {
      handleRemoveProductFromCartDb(prod._id);
    }
    setActualProducts([]);
  };

  return (
    <Fragment>
      {!isLoaded ? (
        <Loading />
      ) : (
        <>
          <div className={styles.cartList}>
            {actualProducts.length === 0 ? (
              <h2>Twój koszyk jest pusty</h2>
            ) : (
              <>
                <h2>Twój koszyk</h2>
                {actualProducts.map((product) => (
                  <div key={product._id} className={styles.oneCartItem}>
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
              </>
            )}
          </div>
          <aside className={styles.aside}>
            {orders.length === 0 ? (
              <>
                <h3>Nie posiadasz jeszcze żadnych zamówień</h3>
                <h4>
                  Dodaj produkty do koszyka i złóż zamównienie w swoim koszyku!
                </h4>
              </>
            ) : (
              <>
                <h3>Twoje zamówienia:</h3>
                <ol>
                  {orders.map((order) => (
                    <li key={order._id}>{order._id} </li>
                  ))}
                </ol>
              </>
            )}
          </aside>
        </>
      )}
    </Fragment>
  );
};

export const getServerSideProps = async ctx => {
  const { userId } = getAuth(ctx.req)
  console.log("userId: ", userId);
  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }
  const user = userId ? await clerkClient.users.getUser(userId) : undefined;
  console.log(
    "user email from server-side: ",
    user.emailAddresses[0].emailAddress
  );
  let userEmail = user.emailAddresses[0].emailAddress;
  if (!userEmail) {
    userEmail = "guest";
  }

  const prods = await loadCartItems(userEmail);
  let products = [];
  if (prods) {
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
  }

  const orders = await loadUserOrders(userEmail);
  console.log("orders: ", orders);
  orders.map((order) => {
    order._id = order._id.toString().slice("ObjectId(");
  });
  console.log("orders: ", orders);
  return {
    props: {
      products: products,
      orders: orders,
      serverUserEmail: userEmail,
    },
  };
};

export default Koszyk;
