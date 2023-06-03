import { useRouter } from "next/router";
import { findProductById } from "../../../../db/db-utils";
import Loading from "@/components/helpers/Loading";

const ShoeIdPage = (props) => {
  const {...product} = props
//   console.log(product)
  const router = useRouter();

  return (
    <>
    {!product ? (
        <Loading />
      ) : (
        <>
        <div>{product.brand}</div>
        <div>{product.description}</div>
        </>
      )}
    </>
  );
};

export default ShoeIdPage;

export async function getServerSideProps({ params }) {
  const { prodId } = params;
  let product = await findProductById(prodId, "shoes", "products");
  delete product._id;
  
  return { props: { ...product } };
}
