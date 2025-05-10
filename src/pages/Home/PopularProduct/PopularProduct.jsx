import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Container from "../../../components/Shared/Container";
import ProductIntro from "./ProductIntro";
import PopularProductCard from "./PopularProductCard";
import Heading from "../../../components/Shared/Heading";
import { useState } from "react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";


const PopularProduct = () => {
  //const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure()
  const [processing, setProcessing] = useState(false);
  const [role] = useRole();
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: allPopularProducts = [], isLoading, refetch } = useQuery({
    queryKey: ["all-popular-products"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-popular-products`);
      return data;
    },
  });



  
  const handleSubmit = async (event, _id) => {
    console.log(_id);
    event.preventDefault();
    //setSelectedProductId(_id);

    if (role === "seller" || role === "admin") {
      return toast.error(`Action Not Allowed!! You are a ${role}`);
    }

    // if (!user) {
    //   return navigate("/login");
    // }
    setProcessing(true);

    const { data: singleProduct = {} } = await axiosSecure.get(
      `/singleProduct/${_id}`
    );
    console.log(singleProduct);

    //1. create payment info obj
    const paymentInfo = {
      ...singleProduct,
      price: singleProduct?.productPrice,
      user: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      productId: singleProduct?._id,
      transactionId: null,
      date: new Date(),
      quantity: 1,
      status: true
    };
    delete paymentInfo._id;
    console.log(paymentInfo);

    try {
      //2. save payment info in booking collection(db)
      const { data } = await axiosSecure.post("/carts", paymentInfo);
      console.log(data);

      //update ui
      refetch();
      toast.success("Product Added Sucessfully To Cart!!");
      //navigate("/dashboard/myBooking");
      setProcessing(false);
    } catch (err) {
      console.log(err);
      //toast.success(err);
    }
    setProcessing(false);
  };

  console.log(allPopularProducts);
  if (isLoading || processing) return <LoadingSpinner />;

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
          <div className=" container mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-10">
            {/* {allPopularProducts.filter(job => job.status ==='Approved').slice(0, 6).map((product) => ( */}
            {allPopularProducts.filter(job => job.status ==='pending').slice(0, 12).map((product) => (
              <PopularProductCard key={product._id} product={product} handleSubmit={handleSubmit} />
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
