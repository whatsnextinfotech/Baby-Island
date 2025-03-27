import React from 'react';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import About from './About';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductDisplayPage from './ProductListPage';
import image1 from "../assets/net-images-1.jpg"
import image2 from "../assets/dress.jpg"
import image3 from "../assets/nestbed.jpg"

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (categoryId, categoryName) => {
    // Find the first subcategory that belongs to this category
    const subcategory = subCategoryData.find(sub => {
      return sub.category.some(c => c._id === categoryId);
    });
    
    if (subcategory) {
      const url = `/${valideURLConvert(categoryName)}-${categoryId}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
      navigate(url);
    }
  };
  
  const handleRedirectToSubcategory = (subcategoryId, subcategoryName) => {
    // Find the category this subcategory belongs to
    const subcategory = subCategoryData.find(sub => sub._id === subcategoryId);
    
    if (subcategory && subcategory.category && subcategory.category.length > 0) {
      const categoryId = subcategory.category[0]._id;
      const categoryName = subcategory.category[0].name;
      
      const url = `/${valideURLConvert(categoryName)}-${categoryId}/${valideURLConvert(subcategoryName)}-${subcategoryId}`;
      navigate(url);
    }
  };

  // Custom banner designs for baby products
  const banners = [
    {
      id: 1,
      title: "Adorable Baby Essentials",
      subtitle: "Comfort & quality for your little one",
      cta: "SHOP NOW",
      bgColor: "bg-gradient-to-br from-blue-300 to-purple-300",
      textColor: "text-gray-800",
      image: image1
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Spring collection for your baby",
      cta: "EXPLORE",
      bgColor: "bg-gradient-to-br from-pink-200 to-pink-400",
      textColor: "text-gray-800",
      image: image2
    },
    {
      id: 3,
      title: "Organic Baby Care",
      subtitle: "Gentle products for sensitive skin",
      cta: "DISCOVER",
      bgColor: "bg-gradient-to-br from-green-200 to-green-400",
      textColor: "text-gray-800",
      image: image3
    }
  ];

  return (
    <section className='bg-white'>
      {/* Dynamic Scrollable Category List */}
      <div className="w-full h-[50px] flex items-center justify-center mb-3 overflow-x-auto no-scrollbar">
        <ul className="flex space-x-8 md:space-x-24 whitespace-nowrap px-4">
          {subCategoryData.map((subcat) => (
            <li key={subcat._id}>
              <a
                href="#"
                onClick={() => handleRedirectToSubcategory(subcat._id, subcat.name)}
                className="text-gray-700 hover:text-pink-500 font-semibold"
              >
                {subcat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Banner Carousel Section */}
   {/* Banner Carousel Section */}
   <div className="w-full h-full min-h-48 flex items-center justify-center mb-10">
  <div className="w-full mx-auto">
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="rounded-xl shadow-lg swiper-white-arrows"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className={`w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] ${banner.bgColor} rounded-xl overflow-hidden relative`}>
            
            {/* Content Container - Flex column on mobile, row on desktop */}
            <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-16 lg:justify-between">
              
              {/* Image Container - First on mobile */}
              <div className="w-4/5 lg:w-2/5 h-2/4 lg:h-5/6 mb-2 lg:mb-0 lg:order-2">
                <div className="bg-white bg-opacity-95 p-2 lg:p-6 rounded-lg shadow-md h-full flex items-center justify-center">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="max-h-full object-contain rounded"
                  />
                </div>
              </div>
              
              {/* Text and Button Container - Second on mobile */}
              <div className="w-full lg:w-1/2 z-10 flex flex-col items-center lg:items-start text-center lg:text-left lg:order-1">
                <h2 className={`text-xl sm:text-2xl lg:text-6xl font-bold mb-1 sm:mb-3 ${banner.textColor}`}>
                  {banner.title}
                </h2>
                <p className={`text-xs sm:text-sm lg:text-2xl mb-2 sm:mb-4 ${banner.textColor} opacity-90`}>
                  {banner.subtitle}
                </p>
                <button className="bg-white text-pink-600 hover:bg-pink-50 px-4 py-1 sm:py-2 lg:px-8 lg:py-3 rounded-full font-bold shadow-md transition duration-300 transform hover:scale-105 text-xs sm:text-sm lg:text-base">
                  {banner.cta}
                </button>
              </div>
            </div>
            
            {/* Wave Pattern - Simplified for mobile */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                <path
                  fill="rgba(255,255,255,0.2)"
                  fillOpacity="1"
                  d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,133.3C672,107,768,85,864,96C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
              </svg>
            </div>
            
            {/* Decorative Elements Removed for Mobile */}
            <div className="hidden md:block absolute top-10 right-10 w-16 h-16 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.5 2a4.5 4.5 0 0 1-.883 8.82l.883 1.682 3.5-7-3.5-3.5zm-13 0l-3.5 3.5 3.5 7 .883-1.682A4.5 4.5 0 0 1 5.5 2zM12 13.95l-1-2-1 2-2 .5 1.5 1.5-.5 2L12 16.5l2.5 1.5-.5-2 1.5-1.5-2-.5z" />
              </svg>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  </div>
</div>

{/* Add this CSS to your stylesheet or as a style tag */}
<style jsx>{`
  .swiper-white-arrows .swiper-button-next,
  .swiper-white-arrows .swiper-button-prev {
    color: white !important;
  }
  
  .swiper-white-arrows .swiper-pagination-bullet {
    background: white;
    opacity: 0.7;
  }
  
  .swiper-white-arrows .swiper-pagination-bullet-active {
    opacity: 1;
  }
`}</style>
    
      {/* Display category product */}
      {
        categoryData?.length > 0 && (
          <>
            {/* Best Selling Products */}
            {
              categoryData
                .filter(c => c.name === "Best Selling")
                .map((c) => (
                  <CategoryWiseProductDisplay 
                    key={c?._id + "BestSelling"} 
                    id={c?._id} 
                    name={c?.name}
                  />
                ))
            }

            {/* New Arrivals */}
            {
              categoryData
                .filter(c => c.name === "New Arrivals")
                .map((c) => (
                  <CategoryWiseProductDisplay 
                    key={c?._id + "NewArrivals"} 
                    id={c?._id} 
                    name={c?.name} 
                    sortByLatest={true}
                  />
                ))
            }
          </>
        )
      }

      {/* Categories Section */}
      <div className="container mx-auto mt-16">
      <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-black w-12"></div>
          <h2 className="text-2xl font-bold mx-4 text-gray-800"> Shop by Categories</h2>
          <div className="h-px bg-black w-12"></div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
  <div className='grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7  gap-5 sm:gap-6 md:gap-6 lg:gap-10 mt-6  mx-auto max-w-full px-1 sm:px-6'>
    {
      loadingCategory ? (
        new Array(12).fill(null).map((c, index) => (
          <div key={index+"loadingcategory"} className='bg-white rounded-lg p-1 sm:p-2 md:p-4 min-h-24 sm:min-h-28 md:min-h-36 grid gap-1 sm:gap-2 shadow animate-pulse'>
            <div className='bg-gray-300 h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 rounded-full mx-auto'></div>
            <div className='bg-gray-300 h-3 sm:h-4 md:h-6 rounded w-3/4 mx-auto'></div>
          </div>
        ))
      ) : (
        categoryData.map((cat) => (
          <div
            key={cat._id+"displayCategory"}
            className='w-full h-full flex flex-col items-center transition duration-300 transform hover:scale-105 cursor-pointer'
            onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
          >
            <div className="bg-gray-50 rounded-full p-2 sm:p-2 md:p-3 mb-1 sm:mb-2 md:mb-3 shadow-md">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 truncate w-full">{cat.name}</h3>
            </div>
          </div>
        ))
      )
    }
  </div>
</div>

      {/* Subcategories Section */}
      <div className="container mx-auto mt-20">
      <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-black w-12"></div>
          <h2 className="text-2xl font-bold mx-4 text-gray-800">  Popular Subcategories</h2>
          <div className="h-px bg-black w-12"></div>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 mx-auto max-w-6xl px-4'>
          {
            loadingCategory ? (
              new Array(8).fill(null).map((c, index) => (
                <div key={index+"loadingsubcategory"} className=' rounded-lg p-4 min-h-48 grid gap-2 shadow animate-pulse'>
                  <div className='bg-gray-300 min-h-36 rounded-full mx-auto'></div>
                  <div className='bg-gray-300 h-6 rounded w-3/4 mx-auto'></div>
                </div>
              ))
            ) : (
              subCategoryData.slice(0, 8).map((subcategory) => (
                <div 
                  key={subcategory._id+"displaySubcategory"} 
                  className='w-full   overflow-hidden transition duration-300 cursor-pointer' 
                  onClick={() => handleRedirectToSubcategory(subcategory._id, subcategory.name)}
                >
                  <div className="p-4 flex flex-col items-center">
                    <div className="bg-pink-40 rounded-full p- mb-4">
                      <img 
                        src={subcategory.image}
                        alt={subcategory.name}
                        className='w-36 h-36 object-cover rounded-full'
                      />
                    </div>
                    <div className='text-center'>
                      <h3 className='font-medium text-gray-800 capitalize'>{subcategory.name}</h3>
                      {/* <p className='text-sm text-gray-500 mt-1'>
                        {subcategory.category && subcategory.category[0] ? subcategory.category[0].name : 'Category'}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>

      {/* Featured Baby Products Banner */}
      {/* <div className="w-full max-w-6xl mx-auto mt-20 px-4">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center shadow-lg">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Safe & Comfortable</h2>
            <p className="text-lg text-gray-700 mb-6">Our products are designed with your baby's safety and comfort in mind. Made from premium materials that are gentle on delicate skin.</p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-md transition duration-300">
              Shop Premium Collection
            </button>
          </div>
          <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="Premium Baby Products" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
  */}
      <div className='mt-20'>
        <About/>
      </div>

      {/* <ProductDisplayPage/> */}
    </section>
  );
};

export default Home;