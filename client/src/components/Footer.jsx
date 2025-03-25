import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
        {/* Left Section - Logo & Address */}
        <div className="w-full md:w-1/4">
          <img
            src="/assets/logo.png"
            alt="Baby Island"
            className="w-28 mb-2"
          />
          <p className="font-bold">Address:</p>
          <p>XXXXXX</p>
        </div>

        {/* Middle Section - Navigation */}
        <div className="w-full md:w-1/4">
          <h3 className="font-bold mb-2">Main Menu</h3>
          <ul className="space-y-1">
            <li>Home</li>
            <li>About Us</li>
            <li>Shop</li>
            <li>New Arrival</li>
            <li>Best Selling</li>
            <li>Categories</li>
          </ul>
        </div>

        {/* Middle Section - Customer Services */}
        <div className="w-full md:w-1/4">
          <h3 className="font-bold mb-2">Customer Services</h3>
          <ul className="space-y-1">
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Customer Policy</li>
          </ul>
        </div>

        {/* Right Section - Support Contact */}
        <div className="w-full md:w-1/4">
          <h3 className="font-bold mb-2">Customer Support No</h3>
          <p>9999999999 / 9999999999</p>
          <p>Monday - Saturday (10am-8pm)</p>
          <p>Saturday Off</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
