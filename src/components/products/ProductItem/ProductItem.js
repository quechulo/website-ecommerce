import Image from "next/image";
import styles from "./ProductItem.module.css";
import { useState } from "react";

const ProductItem = ({ product, onProductClick }) => {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleProductClick = () => {
      setIsSelected(true);
      onProductClick(product._id);
    };
  
    return (
      <div className={`${styles.productItem} ${isSelected ? styles.productSelected : ""}`} onClick={handleProductClick}>
        <div className={styles.productItemImage}>
          <Image src={product.photos} alt={product.name} width={300} height={300} />
        </div>
        <div className={styles.productItemInfo}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      </div>
    );
  };

export default ProductItem;
