import ProductList from "@/components/products/ProductList/ProductList";

const AllClothesPage = ({ products }) => {
    return (
        <ProductList products={products.clothes} />
    )
}

export default AllClothesPage;

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/ubrania");
    const products = await res.json();
    return {
      props: {
        products,
      },
    };
  }