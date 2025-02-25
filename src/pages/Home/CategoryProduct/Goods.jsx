import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Container from "../../../components/Shared/Container";
import ProductIntro from "../PopularProduct/ProductIntro";
import CategoryProductCard from "./CategoryProductCard";
import { Link, useParams } from "react-router-dom";
import Heading from "../../../components/Shared/Heading";

const Goods = () => {
  const { category } = useParams();
  console.log(category);

  //const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();

  const { data: allCategoryProducts = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-products`);
      return data;
    },
  });
  console.log(allCategoryProducts);
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
      {allCategoryProducts && allCategoryProducts.length > 0 ? (
        <>
          <div className=" container mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
            {/* {allPopularProducts.filter(job => job.status ==='Approved').slice(0, 6).map((product) => ( */}
            {allCategoryProducts
              .filter((job) => job.category === category)
              .map((product) => (
                <CategoryProductCard key={product._id} product={product} />
              ))}
          </div>

          {allCategoryProducts.filter((job) => job.status === category)
            .length > 6 && (
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

export default Goods;
