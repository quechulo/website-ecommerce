import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import { Inter } from "next/font/google";
import { findProductById } from "../../db/db-utils";
import { useState, useRef, useEffect } from "react";
import ProductItem from "@/components/products/ProductItem/ProductItem";

const inter = Inter({ subsets: ["latin"] });

function HomePage(props) {
  const shoes = props.products.shoes;
  const clothes = props.products.clothes;
  console.log(props.products);

  return (
    <div className={styles["homepage-container"]}>
      <main className={styles["main-content-container"]}>
        <div className={styles["first-row"]}>Homepage content</div>
        <div className={styles["second-row"]}>Main content</div>
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
