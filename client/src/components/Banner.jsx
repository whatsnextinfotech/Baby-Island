import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
  const banners = [
    {
      desktop: "/assets/",
      mobile: "/assets/banner1-mobile.jpg",
    },
    {
      desktop: "/assets/banner2-desktop.jpg",
      mobile: "/assets/banner2-mobile.jpg",
    },
    {
      desktop: "/assets/banner3-desktop.jpg",
      mobile: "/assets/banner3-mobile.jpg",
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="w-full  mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="rounded-xl shadow-lg"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full min-h-48 flex items-center justify-center bg-[#293952] rounded">
                {/* Desktop Image */}
                <img
                  src={banner.desktop}
                  className="w-[50%] h-[500px] hidden lg:block"
                  alt={`banner-${index}`}
                />
                {/* Mobile Image */}
                <img
                  src={banner.desktop}
                  className="w-full h-full lg:hidden"
                  alt={`banner-mobile-${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
