import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { useSelector } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const WishlistButton = ({ data }) => {
    const { addToWishlist, removeFromWishlist } = useGlobalContext();
    const wishlistItems = useSelector(state => state.wishlist?.wishlist || []);
    const [loading, setLoading] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlistItemId, setWishlistItemId] = useState(null);

    // Check if item is in wishlist
    useEffect(() => {
        if (wishlistItems && wishlistItems.length > 0 && data?._id) {
            const wishlistItem = wishlistItems.find(item => item.productId?._id === data?._id);
            if (wishlistItem) {
                setIsInWishlist(true);
                setWishlistItemId(wishlistItem._id);
            } else {
                setIsInWishlist(false);
                setWishlistItemId(null);
            }
        }
    }, [wishlistItems, data]);

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (loading) return;
        
        try {
            setLoading(true);
            
            if (isInWishlist) {
                // Remove from wishlist
                await removeFromWishlist(wishlistItemId);
                setIsInWishlist(false);
            } else {
                // Add to wishlist
                await addToWishlist(data?._id);
                setIsInWishlist(true);
            }
        } catch (error) {
            console.error("Wishlist operation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-full flex justify-center">
            <button
                onClick={handleWishlistToggle}
                className={`z-10 bg-white hover:bg-gray-100 shadow-lg pl-1 pt-1 pr-1 text-lg w-8 h-8 top-2 right-5 rounded-full font-extrabold
                    ${isInWishlist ? 'text-red-500' : 'text-gray-500'}`}
            >
                {loading ? (
                    <span className="animate-pulse">
                        <CiHeart size={22} />
                    </span>
                ) : isInWishlist ? (
                    <FaHeart size={22} />
                ) : (
                    <CiHeart size={22} />
                )}
            </button>
        </div>
    );
};

export default WishlistButton;