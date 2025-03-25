import React from 'react';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton1';
import WishList from './AddToWishListButton';

const CardProduct = ({ data }) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

    return (
        <Link 
            to={url}
            className="
                w-[calc(50%-0.5rem)] 
                sm:w-[calc(33.333%-0.75rem)] 
                md:w-[calc(25%-1rem)] 
                lg:w-auto 
                border 
                py-2 
                sm:py-2 
                lg:p-3 
                grid 
                gap-2 
                sm:gap-2 
                lg:gap-3 
                min-w-[160px]  
                sm:min-w-[200px]  
                lg:min-w-72 
                rounded-xl 
                cursor-pointer 
                bg-white 
                relative 
                shadow-md 
                hover:shadow-lg 
                transition-all 
                duration-300
                flex-shrink-0
            "
        >
            {/* Wishlist Button */}
            <div className="
                absolute 
                top-1.5 
                right-2 
                bg-white 
                shadow-md 
                p-1.5 
                w-7 
                h-7 
                sm:w-9 
                sm:h-9 
                rounded-full 
                flex 
                justify-center 
                items-center 
                cursor-pointer 
                transition-all 
                duration-300 
                hover:bg-gray-100
            ">
                <WishList data={data} />
            </div>

            {/* Product Image with Increased Mobile Sizing */}
            <div className="
                w-full 
                h-[120px] 
                sm:h-[200px] 
                md:h-[180px] 
                lg:h-[200px] 
                flex 
                justify-center 
                items-center 
                overflow-hidden 
                rounded-lg
            ">
                <img 
                    src={data.image[0]}
                    className="
                        max-w-full 
                        max-h-full 
                        object-contain 
                        transition-transform 
                        duration-300 
                        ease-in-out 
                        hover:scale-110
                    "
                    alt={data.name}
                />
            </div>

            {/* Product Name */}
            <div className="
                px-1.5 
                lg:px-0 
                font-semibold 
                capitalize 
                text-xs 
                sm:text-xs 
                lg:text-base 
                text-gray-900 
                truncate 
                h-5 
                sm:h-5
            ">
                {data.name.toLowerCase()}
            </div>

            {/* Review Section */}
            <div className="
                flex 
                items-center 
                text-yellow-500 
                text-xs 
                sm:text-xs 
                px-1.5 
                h-4 
                sm:h-4
            ">
                ★★★★☆ <span className="ml-1 sm:ml-2 text-gray-500">(4.5/5)</span>
            </div>

            {/* Pricing & Discount */}
            <div className="
                px-1.5 
                lg:px-0 
                flex 
                items-center 
                justify-between 
                gap-2 
                sm:gap-2 
                lg:gap-4 
                text-xs 
                sm:text-xs 
                h-8 
                sm:h-8
            ">
                <div className="flex items-center gap-2 sm:gap-2">
                    {/* Discounted Price */}
                    <div className="
                        font-bold 
                        text-gray-900 
                        text-sm 
                        sm:text-sm 
                        lg:text-lg
                    ">
                        {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                    </div>
                    
                    {/* Original Price (Strikethrough) */}
                    {data.discount && (
                        <p className="
                            line-through 
                            text-gray-500 
                            text-[9px] 
                            sm:text-[10px] 
                            lg:text-xs
                        ">
                            MRP {DisplayPriceInRupees(data.price)}
                        </p>
                    )}
                    
                    {/* Discount Percentage */}
                    {data.discount && (
                        <span className="
                            text-red-600 
                            px-1 
                            sm:px-1 
                            py-0.5 
                            text-[9px] 
                            sm:text-[10px] 
                            lg:text-xs 
                            bold 
                            rounded-lg
                        ">
                            {data.discount}% OFF
                        </span>
                    )}
                </div>
            </div>

            {/* Add to Cart Button */}
            <div className="
                flex 
                justify-center 
                items-center 
                text-center 
                mx-auto 
                mt-2 
                sm:mt-2 
                h-10 
                sm:h-10 
                w-full 
                px-1.5
            ">
                {data.stock === 0 ? (
                    <p className="
                        text-red-500 
                        text-xs 
                        sm:text-xs 
                        font-semibold
                    ">
                        Out of stock
                    </p>
                ) : (
                    <AddToCartButton data={data} />
                )}
            </div>
        </Link>
    );
};

export default CardProduct;