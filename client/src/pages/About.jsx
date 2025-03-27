import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Chooseus from "../assets/about.png"
import about from "../assets/chooseus.png"

const About = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Navigate to home

    // Slow scroll effect
    let position = window.scrollY;
    const scrollInterval = setInterval(() => {
      position -= 30; // Adjust speed (smaller values = slower)
      window.scrollTo(0, position);
      if (position <= 0) clearInterval(scrollInterval); // Stop at the top
    }, 10); // Adjust interval timing (higher = smoother)
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      {/* <div className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to Baby Island</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Creating a safe, comfortable, and joyful world for your little ones
          </p>
        </div>
      </div> */}
      
      <div className="max-w-5xl mx-auto p-6">
        {/* Why Baby Island Section */}
        <section className="mb-16">
         

          <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-black w-12"></div>
          <h2 className="text-2xl font-bold mx-4 text-gray-800"> Why Choose Baby Island</h2>
          <div className="h-px bg-black w-12"></div>
        </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Carefully selected products that meet the highest safety and quality standards
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Shopping</h3>
              <p className="text-gray-600">
                User-friendly experience with fast shipping and hassle-free returns
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Special Offers</h3>
              <p className="text-gray-600">
                Exclusive discounts and personalized recommendations for parents
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-xl">
            <img
              src={Chooseus}
              alt="Happy Baby"
              className="w-full md:w-1/3 h-64 rounded-xl object-cover shadow-md"
            />
            <div className="w-full md:w-2/3">
              <p className="text-gray-700 text-lg">
                We offer a wide selection of high-quality, safe products at affordable prices. Our user-friendly website provides personalized recommendations, fast shipping, and expert parenting resources. We prioritize sustainability and customer satisfaction, offering hassle-free returns and exclusive discounts. With us, shopping for your baby is easy, reliable, and stress-free.
              </p>
              <button
      className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
      onClick={handleRedirect}
    >
      Explore Our Products
    </button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="mb-16">
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-black w-12"></div>
          <h2 className="text-2xl font-bold mx-4 text-gray-800">What Parents Say</h2>
          <div className="h-px bg-black w-12"></div>
        </div>
          
          <Slider {...settings} className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-3">
                <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-md h-64 flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
                  <div>
                  <div className="flex text-yellow-400 mb-3">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{testimonial.title}</h3>
                    <p className="text-gray-600">{testimonial.review}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      {/* <p className="text-xs text-gray-500">Verified Customer</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* About Us Section */}
        <section className="mb-16">
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-black w-12"></div>
          <h2 className="text-2xl font-bold mx-4 text-gray-800">About Us</h2>
          <div className="h-px bg-black w-12"></div>
        </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <img
              src={about}
              alt="Our Team"
              className="w-full md:w-1/3 h-64 rounded-xl object-cover shadow-md"
            />
            <div className="w-full md:w-2/3">
              <p className="text-gray-700 text-lg mb-4">
                At Baby Island, we are dedicated to providing the best products for your little one. Our carefully curated selection of baby essentials includes everything from clothing and toys to nursery items, all sourced from trusted, high-quality brands.
              </p>
              <p className="text-gray-700 text-lg">
                We prioritize safety, comfort, and sustainability, ensuring peace of mind for every parent. With a user-friendly shopping experience, fast shipping, and excellent customer service, we're here to support you on your parenting journey.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">Safety First</div>
                <div className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">Quality Assured</div>
                <div className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">Eco-Friendly</div>
                <div className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">Parent Approved</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        
      </div>
    </div>
  );
};

const testimonials = [
  {
    title: "Outstanding Quality",
    review:
      "Great quality products! Everything I've purchased has been safe, durable, and perfect for my baby. Would recommend to every parent!",
    name: "Reshma",
  },
  {
    title: "Safety First Products",
    review:
      "Absolutely love the safety of these products! I feel confident knowing everything is high-quality and safe for my baby.",
    name: "Hema",
  },
  {
    title: "Excellent Service",
    review:
      "Fantastic quality and fast delivery! This site has it all for any baby's needs. The customer service team is very responsive.",
    name: "Karthick",
  },
  {
    title: "Perfect for New Parents",
    review:
      "As a first-time parent, I was overwhelmed with choices. Baby Island made it so easy to find exactly what I needed!",
    name: "Anita",
  },
  {
    title: "Best Baby Store",
    review:
      "I've tried many baby stores, but Baby Island stands out for quality, price, and selection. My go-to for all baby essentials.",
    name: "Raj",
  },
];

export default About;