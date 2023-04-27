import ProductList from "@/components/products/ProductList/ProductList";

const AllShoesPage = ({ products }) => {

    return (
        <ProductList products={products.shoes} />
    )
}

export default AllShoesPage;

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/buty");
    const products = await res.json();
    return {
      props: {
        products,
      },
    };
  }