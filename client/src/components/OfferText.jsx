import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TextScroller = ({ announcements = [] }) => {
  const [direction, setDirection] = useState("left");
  
  // Default announcements if none are provided
  const defaultAnnouncements = [
    "🚀 Welcome to our store! Get the best deals today.",
    "🎉 Limited time offer! Shop now and save big.",
    "🛍️ Free shipping on orders over $50!"
  ];
  
  // Use provided announcements or default if empty
  const displayAnnouncements = announcements.length > 0 ? announcements : defaultAnnouncements;
  
  return (
    <div className="relative w-full bg-gray-100 py-3 flex items-center justify-center">
      {/* Left Arrow - Hidden on mobile, visible from medium screens */}
      <button
        className="absolute left-4 md:left-28 z-10 p-2 hidden md:block"
        onClick={() => setDirection("right")}
      >
        <FaChevronLeft />
      </button>
      
      {/* Marquee Container with padding to prevent overlap */}
      <div className="w-[90%] md:w-[80%] mx-auto">
        <Marquee speed={50} direction={direction} pauseOnHover={true} gradient={false}>
          {displayAnnouncements.map((text, index) => (
            <span key={index} className="mx-4">{text}</span>
          ))}
        </Marquee>
      </div>
      
      {/* Right Arrow - Hidden on mobile, visible from medium screens */}
      <button
        className="absolute right-4 md:right-28 z-10 p-2 hidden md:block"
        onClick={() => setDirection("left")}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default TextScroller;