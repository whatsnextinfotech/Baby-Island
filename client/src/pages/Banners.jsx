import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// In your actual implementation, import your baby product banner images
// import babyEssentialsBanner from '../assets/baby-essentials-banner.jpg';
// import babySaleBanner from '../assets/baby-sale-banner.jpg';
// import newBabyArrivalsBanner from '../assets/new-baby-arrivals.jpg';

// For this example, we'll use placeholder paths
const babyEssentialsBanner = "https://via.placeholder.com/1200x500";
const babySaleBanner = "https://via.placeholder.com/1200x500";
const newBabyArrivalsBanner = "https://via.placeholder.com/1200x500";

const banners = [
  {
    image: babyEssentialsBanner,
    title: "Baby Essentials Collection",
    subtitle: "Everything your little one needs for comfort & care",
    primaryButton: "Shop Essentials",
    secondaryButton: "Gift Ideas",
    primaryColor: "pink-600",
    gradientColor: "pink-400/30",
    bgColor: "bg-pink-50"
  },
  {
    image: babySaleBanner,
    title: "Spring Baby Sale",
    subtitle: "Up to 40% off on all baby clothing & accessories",
    primaryButton: "Shop Sale",
    secondaryButton: "View All",
    primaryColor: "sky-600",
    gradientColor: "sky-400/30",
    bgColor: "bg-blue-50"
  },
  {
    image: newBabyArrivalsBanner,
    title: "New Baby Arrivals",
    subtitle: "Discover our latest organic cotton collection",
    primaryButton: "Shop New",
    secondaryButton: "Learn More",
    primaryColor: "green-600",
    gradientColor: "green-400/30",
    bgColor: "bg-green-50"
  }
];

const BabyProductsBannerCarousel = () => {
  return (
    <div className="w-full h-full min-h-48 flex items-center justify-center">
      <div className="w-full mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="rounded-xl shadow-lg"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className={`relative overflow-hidden rounded-xl h-[500px] ${banner.bgColor}`}>
                {/* Left side content - For desktop */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-10 md:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-md">
                    {banner.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className={`bg-${banner.primaryColor} text-white hover:bg-opacity-90 transition py-2 md:py-3 px-6 md:px-8 rounded-full font-semibold text-lg`}>
                      {banner.primaryButton}
                    </button>
                    <button className={`bg-transparent border-2 border-${banner.primaryColor} text-${banner.primaryColor} hover:bg-opacity-10 transition py-2 md:py-3 px-6 md:px-8 rounded-full font-semibold text-lg`}>
                      {banner.secondaryButton}
                    </button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-l from-${banner.gradientColor} to-transparent`}></div>
                
                {/* Background image - positioned on the right side for desktop, full screen for mobile */}
                <div className="absolute inset-0 md:left-1/2 md:w-1/2 flex items-center justify-center">
                  <img 
                    src={banner.image} 
                    className="w-full h-full object-cover opacity-90 md:opacity-100 rounded-xl md:rounded-none" 
                    alt={banner.title} 
                  />
                  
                  {/* Overlay for mobile only to ensure text readability */}
                  <div className="absolute inset-0 bg-white/70 md:hidden"></div>
                </div>
                
                {/* Decorative baby-themed elements */}
                <div className="absolute top-4 left-4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/80 flex items-center justify-center z-20">
                  <span className="text-2xl md:text-4xl">👶</span>
                </div>
                <div className="absolute bottom-4 right-4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/80 flex items-center justify-center z-20">
                  <span className="text-2xl md:text-4xl">🧸</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BabyProductsBannerCarousel;