import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const Footer = ({ close }) => {
  const navigate = useNavigate();
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);

  const handleRedirectProductListpage = (categoryId, categoryName) => {
    // Close any open menu if close function is provided
    if (close) close();

    // Find the first subcategory that belongs to this category
    const subcategory = subCategoryData.find(sub => {
      return sub.category.some(c => c._id === categoryId);
    });
    
    if (subcategory) {
      const url = `/${valideURLConvert(categoryName)}-${categoryId}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
      navigate(url);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section - Logo & Company Info */}
        <div className="flex flex-col items-start">
          <img
            src="/assets/logo.png"
            alt="Baby Island"
            className="w-36 mb-4 filter brightness-0 invert"
          />
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-300" />
            <p className="text-sm">XXXXXX Street, City, Country</p>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="w-5 h-5 text-blue-300" />
            <a href="mailto:support@babyisland.com" className="hover:text-blue-300 transition">
              support@babyisland.com
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-blue-300" />
            <a href="tel:+9179999999" className="hover:text-blue-300 transition">
              +91 7999 999 99
            </a>
          </div>
        </div>

        {/* Main Menu Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg border-b border-gray-700 pb-2">Main Menu</h3>
          <ul className="space-y-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/' },
              { name: 'Shop', path: '/' },
          
            ].map((item) => (
              <li key={item.name} className="hover:text-blue-300 transition">
                <Link 
                  to={item.path} 
                  onClick={close}
                  className="block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg border-b border-gray-700 pb-2">Categories</h3>
          <ul className="space-y-2">
            {categoryData.map((category) => (
              <li 
                key={category._id} 
                className="hover:text-blue-300 transition cursor-pointer"
                onClick={() => handleRedirectProductListpage(category._id, category.name)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Services Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg border-b border-gray-700 pb-2">Customer Services</h3>
          <ul className="space-y-2">
            {[
              { name: 'Return Policy', path: '/return-policy' },
              { name: 'Privacy Policy', path: '/privacy-policy' },
              { name: 'Shipping Policy', path: '/shipping-policy' },
              { name: 'Terms & Conditions', path: '/terms-conditions' }
            ].map((item) => (
              <li key={item.name} className="hover:text-blue-300 transition">
                <Link 
                  to={item.path} 
                  onClick={close}
                  className="block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
        © {new Date().getFullYear()} Baby Island. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;