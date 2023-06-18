import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import { Inter } from "next/font/google";
import { findProductById } from "../../db/db-utils";
import { useState, useRef, useEffect, useContext } from "react";
import ProductItem from "@/components/products/ProductItem/ProductItem";
import { useUser } from "@clerk/nextjs";

import { UserContext } from "./_app";

const inter = Inter({ subsets: ["latin"] });

function HomePage(props) {
  const shoes = props.products.shoes;
  const clothes = props.products.clothes;
  // console.log(props.products);
  const { isLoaded, isSignedIn, user } = useUser();
  const { userEmail, setUserEmail } = useContext(UserContext);
  const [email, setEmail] = useState("");


  useEffect(() => {
    if (isLoaded && user) {
      console.log("user:", user)
      setEmail(user.emailAddresses[0].emailAddress);
      console.log("email:", email);
      setUserEmail(email);
      console.log("userEmail:", userEmail);
    }
  }, [user, isLoaded, setUserEmail, email, userEmail]);


  return (
    <div className={styles["homepage-container"]}>
      <main className={styles["main-content-container"]}>
        <div className={styles["first-row"]}>OUR Hot take</div>
        <div className={styles["second-row"]}>
          <div class={styles["cards"]}>
            <div class={`${styles.blue} ${styles.card}`}>
              <p class={styles["tip"]}>Buty</p>
              <p class={styles["second-text"]}>Lorem Ipsum</p>
            </div>
            <div class={`${styles.blue} ${styles.card}`}>
              <p class={styles["tip"]}>Dresy</p>
              <p class={styles["second-text"]}>Lorem Ipsum</p>
            </div>
            <div class={`${styles.blue} ${styles.card}`}>
              <p class={styles["tip"]}>T-shirty</p>
              <p class={styles["second-text"]}>Lorem Ipsum</p>
            </div>
          </div>
        </div>
        <div className={styles["third-row"]}>
          <ProductItem product={shoes[0]} />
          <ProductItem product={shoes[0]} />
          <ProductItem product={shoes[0]} />
          {/* <div className={styles["productItem"]} >
            <div className={styles["productItem-img"]}>
              <Image
                src={shoes[0].photos}
                alt={shoes[0].name}
                width={200}
                height={200}
              />
            </div>

            <h5>{shoes[0].name}</h5>
            <p>{shoes[0].price} PLN</p>
          </div> */}
        </div>
      </main>
      <footer>
        <div>Footer content</div>
        <div> {isSignedIn ? <p>tak {userEmail}</p> : <p>nie</p>} </div>

      </footer>
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {
  let shoe1 = await findProductById(
    "642062462bd782638b17cbb0",
    "shoes",
    "products"
  );
  // let shoe2 = await findProductById(prodId, "shoes", "products");
  // let shoe3 = await findProductById(prodId, "shoes", "products");
  // let cloth1 = await findProductById(, "clothes", "products");
  console.log(shoe1);
  const products = {
    shoes: [shoe1],
    clothes: [],
  };
  delete products.shoes[0]._id;

  return { props: { products } };
}
