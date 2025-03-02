// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PopularProductCard from "../PopularProduct/PopularProductCard";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export default function App() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const [processing, setProcessing] = useState(false);
  const [role] = useRole();
  const { user } = useAuth()

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/feature-products`);
      return data;
    },
  });
  //console.log(products);

  


  const handleSubmit = async (event, _id) => {
    console.log(_id);
    event.preventDefault();
    //setSelectedProductId(_id);

    if (role === "seller" || role === "admin") {
      return toast.error(`Action Not Allowed!! You are a ${role}`);
    }
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
    }
    setProcessing(false);
  };

  if (isLoading || processing) return <LoadingSpinner />;

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <h3 className="font-bold lg:text-3xl mt-12 border-b flex justify-center">
        FEATURED PRODUCTS
      </h3>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper container mx-auto"
        breakpoints={{
          // when window width is >= 640px
          125: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <PopularProductCard product={product} handleSubmit={handleSubmit} />
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container">
          <svg viewBox="0 0 28 28" ref={progressCircle}>
            <circle cx="24" cy="14" r="10"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
