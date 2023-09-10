import AddToCart from "@/components/AddToCart/AddToCart";
import { findProductById } from "../../../../db/db-utils";
import styles from "@/styles/shoePage.module.css";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const ClothIdPage = (props) => {
  const { ...product } = props;
  const { isLoaded, isSignedIn, user } = useUser();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (isLoaded && user) {
      setUserEmail(user.emailAddresses[0].emailAddress)
    }
  }, [isLoaded, user]);

  return (
    <div className={styles["grid-container"]}>
      <img
        className={styles["product-img"]}
        src={product.photos}
        alt={product.name}
      />
      <div className={styles["aside-block"]}>
        <h2>
          {product.brand} <br />
          {product.name}
        </h2>
        <p id={styles["cena-p"]}>Cena: {product.price} PLN</p>
        <div className={styles["aside-bottom"]}>
          <div className={styles["color-content"]}>Kolor: {product.color}</div>
          <AddToCart product={product} userEmail={userEmail} />
          {/*  */}
        </div>
      </div>
      <div className={styles["description-block"]}>
        <div className={styles["description-content"]}>
          <p id={styles["description-p"]}>{product.type} {product.brand} {product.name}</p>
          <p id={styles["description-p"]}>Opis:</p>
          <p id={styles["description-text"]}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ClothIdPage;

export async function getServerSideProps({ params }) {
  const { prodId } = params;
  let product = await findProductById(prodId, "clothes", "products");
  product._id = product._id.toString().slice("ObjectId(");

  return { props: { ...product } };
}
