import { useRouter } from "next/router";
import { findProductById } from "../../../../db/db-utils";

const ShoeIdPage = (props) => {
  const {...product} = props
//   console.log(product)
  const router = useRouter();

  return (
    <>
      <div>{product.brand}</div>
      <div>{product.description}</div>
    </>
  );
};

export default ShoeIdPage;

export async function getServerSideProps({ params }) {
  const { prodId } = params;
  let product = await findProductById(prodId, "clothes", "products");
  delete product._id;
  
  return { props: { ...product } };
}
