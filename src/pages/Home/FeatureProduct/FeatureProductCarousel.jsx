// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PopularProductCard from "../PopularProduct/PopularProductCard";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { addToCart } from "../../../utils/cartStorage";

export default function App() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [processing, setProcessing] = useState(false);
  const [role] = useRole();
  const { user } = useAuth();

  const {
    data: featureProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/feature-products`);
      return data;
    },
  });
  console.log({ featureProducts });

  const handleAddToCart = async (event, _id) => {
    event.preventDefault();

    if (role === "seller" || role === "admin") {
      return toast.error(`Action Not Allowed! You are a ${role}`);
    }

    setProcessing(true);

    try {
      const { data: singleProduct = {} } = await axiosSecure.get(
        `/singleProduct/${_id}`
      );

      console.log({ singleProduct });
      const cartItem = {
        productId: singleProduct._id,
        title: singleProduct.title,
        price: singleProduct.productPrice,
        image: singleProduct.image_url,
        brandName: singleProduct.brandName,
        category: singleProduct.category,
        discount: singleProduct.discount,
        quantity: 1,
        user: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        seller: {
          name: singleProduct?.seller?.name,
          email: singleProduct?.seller?.email,
          image: singleProduct?.seller?.image,
        },
        date: new Date(),
      };

      console.log(cartItem);

      addToCart(cartItem);
      toast.success("Added to cart successfully!");
      // refetch(); // optional: for UI refresh
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart.");
    }

    setProcessing(false);
  };

  if (isLoading || processing) return <LoadingSpinner />;

  return (
    <>
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-8 mt-12 border-b flex justify-center">
        FEATURED PRODUCTS
      </h3>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper container mx-auto"
        breakpoints={{
          // when window width is >= 640px
          125: {
            slidesPerView: 2,
            spaceBetween: 5,
          },

          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {featureProducts?.map((product, index) => (
          <SwiperSlide key={index}>
            <PopularProductCard
              product={product}
              handleSubmit={handleAddToCart}
            />
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
