import { useState } from "react";
import { useRouter } from "next/router";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.css";

const ProductList = ({ products }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const router = useRouter();
  const previousRoute = router.pathname;

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    console.log(previousRoute);
    if (previousRoute.includes("buty")) {
      router.push(`/produkty/buty/${productId}`);
    } else if (previousRoute.includes("ubrania")) {
      router.push(`/produkty/ubrania/${productId}`);
    }
  };
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onProductClick={handleProductClick}
        />
      ))}
    </div>
  );
};

export default ProductList;
