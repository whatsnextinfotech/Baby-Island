import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TextScroller = () => {
  const [direction, setDirection] = useState("left");

  return (
    <div className="relative w-full  bg-gray-100 py-3 flex items-center justify-center">
      {/* Left Arrow */}
      <button
        className="absolute left-28  z-10  p-2 "
        // onClick={() => setDirection("right")}
      >
        <FaChevronLeft />
      </button>

      {/* Marquee Container with padding to prevent overlap */}
      <div className="w-[80%] mx-auto">
        <Marquee speed={50} direction={direction} pauseOnHover={true} gradient={false}>
          🚀 Welcome to our store! Get the best deals today. 🎉 Limited time offer! 🛍️
        </Marquee>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-28 z-10  p-2 "
        // onClick={() => setDirection("left")}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default TextScroller;
