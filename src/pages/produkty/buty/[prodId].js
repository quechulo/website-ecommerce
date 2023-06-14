import { useRouter } from "next/router";
import { findProductById } from "../../../../db/db-utils";
import Loading from "@/components/helpers/Loading";
import styles from "@/styles/shoePage.module.css";
import Image from "next/image";
import AddToCart from "@/components/AddToCart/AddToCart";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const ShoeIdPage = (props) => {
  const { ...product } = props;
  const { isLoaded, isSignedIn, user } = useUser()
  const [userEmail, setUserEmail] = useState(null)

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
        <h2>{product.name}</h2>
        <p id={styles["cena-p"]}>Cena: {product.price} PLN</p>
        <div className={styles["aside-bottom"]}>
          <div className={styles["color-content"]}>Kolor: {product.color}</div>
          <AddToCart product={product} userEmail={userEmail} />
          {/*  */}
        </div>
      </div>
      <div className={styles["description-block"]}>
        <div className={styles["description-content"]}>
        <p id={styles["description-p"]}>Opis:</p>
        <p id={styles["description-text"]}>{product.description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ShoeIdPage;

export async function getServerSideProps({ params }) {
  const { prodId } = params;
  let product = await findProductById(prodId, "shoes", "products");
  // get rid of ObjectId() wrapper in order to be able to json.stringify the object
  product._id = product._id.toString().slice("ObjectId(");

  return { props: { ...product } };
}
