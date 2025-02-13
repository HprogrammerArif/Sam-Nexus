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

export default function Carousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="container  pb-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/0Q8fjMF/photo-1597400473366-371a80b251eb-q-80-w-1530-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Achieve Your Goals || Interactive Learning Awaits"
            des="Elevate your skills with our interactive learning sessions. Engage with top instructors, participate in live discussions, and access exclusive resources to fast-track your success. Join us now and start achieving your goals!"
          ></Slide>
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/HxzYGZH/photo-1526378787940-576a539ba69d-q-80-w-1469-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Explore Our Best Course"
            des="Unlock your potential with our top-rated course designed to provide you with the skills and knowledge needed to excel. Join now and experience expert-led lessons,"
          ></Slide>
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/p3yL5nh/photo-1432888498266-38ffec3eaf0a-q-80-w-1474-auto-format-fit-crop-ixlib-rb-4-0.png"
            }
            text="Your Path to Success || Join Live Session"
            des="Experience personalized learning in our interactive live sessions. Connect with expert instructors, and gain practical knowledge to advance your skills. Embark on your path to success with us today!"
          ></Slide>
        </SwiperSlide>

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
