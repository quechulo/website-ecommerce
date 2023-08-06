import { Fragment } from "react";
import styles from "./AddToCart.module.css";

const AddToCart = (props) => {
  const { product, userEmail } = props;

  // Handle adding the product to cart
  const handleAddToCart = () => {
    // Implement your logic to add the product to the cart
    console.log("Product added to cart:", product);
    console.log("props:", props);
    if (!userEmail || userEmail == "guest") {
      alert("Zaloguj się aby dodać produkt do koszyka");
      return;
    }
    fetch(`/api/addProductToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, productId: product._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Fragment>

      <button id={styles["add-to-cart-btn"]} onClick={handleAddToCart}>
        Dodaj do koszyka
      </button>
      <button id={styles["buy-now-btn"]}>
        Kup teraz
      </button>

    </Fragment>
  );
};

export default AddToCart;
