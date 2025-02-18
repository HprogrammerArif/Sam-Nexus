import Container from "../../../components/Shared/Container";
import Heading from "../../../components/Shared/Heading";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductIntro from "./ProductIntro";
import PopularProductCard from "./PopularProductCard";

const PopularProduct = () => {
  //const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure()

  const { data: allPopularProducts = [], isLoading } = useQuery({
    queryKey: ["all-popular-products"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-popular-products`);
      return data;
    },
  });
  console.log(allPopularProducts);
  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <ProductIntro
        subHeading="We Provide Best!!"
        heading="Our Best and Populer Product!!"
        description={
          "Our All Top Metarial is your gateway to extraordinary culinary experiences. We believe that you deserve nothing but the best, which is why we meticulously curate our selection to offer you exceptional flavors"
        }
      ></ProductIntro>
      {allPopularProducts && allPopularProducts.length > 0 ? (
        <>
          <div className=" container mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
            {/* {allPopularProducts.filter(job => job.status ==='Approved').slice(0, 6).map((product) => ( */}
            {allPopularProducts.filter(job => job.status ==='pending').slice(0, 12).map((product) => (
              <PopularProductCard key={product._id} product={product} />
            ))}
          </div>

          {allPopularProducts.filter(job => job.status ==='pending').length > 6 && (
            <Link to="/shop" className="flex justify-center">
              <button className="bg-gray-600  p-2 px-5 mt-3 text-white">
                See More
              </button>
            </Link>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <Heading
            center={true}
            title="No Products Available Right Now!"
            subtitle="Please Wait Untill New Products Added!!."
          />
        </div>
      )}
    </Container>
  );
};

export default PopularProduct;
