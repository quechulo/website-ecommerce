import styles from "./index.module.css";
import { Inter } from "next/font/google";
import { findProductById } from "../../db/db-utils";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import ProductItem from "@/components/products/ProductItem/ProductItem";
import { useUser } from "@clerk/nextjs";

import { UserContext } from "./_app";

const inter = Inter({ subsets: ["latin"] });

function HomePage(props) {
  const shoes = props.products.shoes;
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { userEmail, setUserEmail } = useContext(UserContext);
  const [email, setEmail] = useState("");


  useEffect(() => {
    if (isLoaded && user) {
      setEmail(user.emailAddresses[0].emailAddress);
      setUserEmail(email);
      
    }
  }, [user, isLoaded, setUserEmail, email, userEmail]);

  const handleProductClick = (productId) => {
      router.push(`/produkty/buty/${productId}`);
  };


  return (
    <div className={styles["homepage-container"]}>
      <main className={styles["main-content-container"]}>
        <div className={styles["first-row"]}>
          <img src="/taylor-smith-aDZ5YIuedQg-unsplash.jpg" alt="hero" className={styles["main-image"]} />
        </div>
        <div className={styles["second-row"]}>
          <div className={styles["cards"]}>
            <div className={`${styles.blue} ${styles.card}`} onClick={() => router.push(`/produkty/buty`)}>
              <p className={styles["tip"]}>Buty</p>
              <p className={styles["second-text"]}>Szeroki wybór najnowszych modeli</p>
            </div>
            <div className={`${styles.blue} ${styles.card}`} onClick={() => router.push(`/produkty/ubrania/6454c52891b8074c03cc6f74`)}>
              <p className={styles["tip"]}>Dres</p>
              <p className={styles["second-text"]}>Wygodny i stylowy na każdą okazję</p>
            </div>
            <div className={`${styles.blue} ${styles.card}`} onClick={() => router.push(`/produkty/ubrania/650345f3c686cc17850a5a53`)}>
              <p className={styles["tip"]}>T-shirt</p>
              <p className={styles["second-text"]}>Idealny na prezent</p>
            </div>
          </div>
        </div>
        <div className={styles["third-row"]}>
          <ProductItem product={shoes[0]} onProductClick={handleProductClick} />
          <ProductItem product={shoes[1]} onProductClick={handleProductClick} />
          <ProductItem product={shoes[2]} onProductClick={handleProductClick} />
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {
  let shoe1 = await findProductById(
    "65033853c686cc17850a5a46",
    "shoes",
    "products"
  );
  shoe1._id = shoe1._id.toString().slice("ObjectId(");
  shoe1['link'] = `/produkty/buty/${shoe1._id}`;

  let shoe2 = await findProductById(
    "65033772c686cc17850a5a45",
    "shoes",
    "products"
  );
  shoe2._id = shoe2._id.toString().slice("ObjectId(");
  shoe2['link'] = `/produkty/buty/${shoe2._id}`;

  let shoe3 = await findProductById(
    "65033bcac686cc17850a5a4a",
    "shoes",
    "products"
  );
  shoe3._id = shoe3._id.toString().slice("ObjectId(");
  shoe3['link'] = `/produkty/ubrania/${shoe3._id}`;

  const products = {
    shoes: [shoe1, shoe2, shoe3],
  };

  return { props: { products } };
}
