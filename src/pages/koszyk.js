import ProductList from "@/components/products/ProductList/ProductList";
import { Fragment, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { loadCartItems } from "../../db/db-utils";

const Koszyk = () => {
    const [products, setProducts] = useState([])
    const { isLoaded, isSignedIn, user } = useUser();

    

    return (
        <Fragment>
        <h1>Koszyk</h1>
        <div>
            {/* <ProductList products={products}/> */}
        </div>
        </Fragment>
    );
};

export default Koszyk;