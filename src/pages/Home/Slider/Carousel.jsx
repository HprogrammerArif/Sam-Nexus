// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import Slide from "./Slide";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

export default function Carousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const {
    data: advertiseData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-advertise-data"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-advertise-data`);
      return data;
    },
  });
  console.log(advertiseData);

  return (
    <div className="container  pb-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className=" w-auto h-52 md:h-72 lg:h-[32rem]"
      >
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/0Q8fjMF/photo-1597400473366-371a80b251eb-q-80-w-1530-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            title="Browse All Products"
            description="All popular prduct and new arrivals products just waiting for kick off!!"
            toLink={`/shop`}
          ></Slide>
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/HxzYGZH/photo-1526378787940-576a539ba69d-q-80-w-1469-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            title="Explore Our Best Books"
            description="Unlock your potential with our top-rated course designed to provide you with the skills and knowledge needed to excel. Join now and experience expert-led lessons,"
            toLink={`/Books`}
          ></Slide>
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/p3yL5nh/photo-1432888498266-38ffec3eaf0a-q-80-w-1474-auto-format-fit-crop-ixlib-rb-4-0.png"
            }
            title="𝐆𝐫𝐚𝐧𝐝 𝐒𝐡𝐨𝐩𝐩𝐢𝐧𝐠 𝐅𝐞𝐬𝐭𝐢𝐯𝐚𝐥-7 🎉"
            description="Grave All Best Quality Products With Cheap Price. Limited Offer and Limmited Editions! Only Avaible for Verifyed Users!! Do Not Miss Out!!"
            toLink={`/campaign`}
          ></Slide>
        </SwiperSlide>

        {advertiseData?.map((data, index) => (
          <SwiperSlide key={index}>
            <Slide
              image={
                data?.image_url  }
              title={data?.title}
              description={data?.descriptiona}
              toLink={`/campaign`}
            ></Slide>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
