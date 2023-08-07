import AddToCart from "@/components/AddToCart/AddToCart";
import { findProductById } from "../../../../db/db-utils";
import styles from "@/styles/shoePage.module.css";

const ClothIdPage = (props) => {
  const { ...product } = props;
  const { isLoaded, isSignedIn, user } = useUser();

  // useEffect(() => {
  //   if (!isLoaded || !isSignedIn) {
  //     return null
  //   }
  //   console.log("userId", user.emailAddresses[0].emailAddress);
  // }, [isLoaded, isSignedIn, user]);

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
          <AddToCart product={product} user={user} />
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
  delete product._id;

  return { props: { ...product } };
}
