import { Fragment } from "react";
import styles from "./AddToCart.module.css";

const AddToCart = (props) => {
  const { product, user } = props;

  // Handle adding the product to cart
  const handleAddToCart = () => {
    // Implement your logic to add the product to the cart
    console.log("Product added to cart:", product);
    console.log("props:", props);
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
