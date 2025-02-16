// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import Slide from "./Slide";
import { useRef } from "react";

export default function App() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

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
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/0Q8fjMF/photo-1597400473366-371a80b251eb-q-80-w-1530-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Achieve Your Goals "
            des="Elev exclusive resources to fast-track your success. Join us now and start achieving your goals!"
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/p3yL5nh/photo-1432888498266-38ffec3eaf0a-q-80-w-1474-auto-format-fit-crop-ixlib-rb-4-0.png"
            }
            text="Your Path Live Session"
            des="Expour skills. Embark on your path to success with us today!"
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/HxzYGZH/photo-1526378787940-576a539ba69d-q-80-w-1469-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Explore Our Best Course"
            des="Unlock  and experience expert-led lessons,"
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/p3yL5nh/photo-1432888498266-38ffec3eaf0a-q-80-w-1474-auto-format-fit-crop-ixlib-rb-4-0.png"
            }
            text="Your Path to in Live Session"
            des="Experienc your skills. Embark on your path to success with us today!"
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/0Q8fjMF/photo-1597400473366-371a80b251eb-q-80-w-1530-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Achieve ctive Learning Awaits"
            des="Elevatand start achieving your goals!"
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/HxzYGZH/photo-1526378787940-576a539ba69d-q-80-w-1469-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Explore Our Best Course"
            des="Unlock your potential with our top-rated course designed to pr expert-led lessons,"
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/0Q8fjMF/photo-1597400473366-371a80b251eb-q-80-w-1530-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Achieve Your Goals || Interactive Learning Awaits"
            des="Elevate your skJoin us now and start achieving your goals!"
          ></Slide>
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            image={
              "https://i.ibb.co/HxzYGZH/photo-1526378787940-576a539ba69d-q-80-w-1469-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            }
            text="Explore Our Best Course"
            des="Unlockwith the skills and knowledge needed to excel. Join now and experience expert-led lessons,"
          ></Slide>
        </SwiperSlide>
        
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
