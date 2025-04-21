import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { useSelector } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const WishlistButton = ({ data }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useGlobalContext();
    const wishlistItems = useSelector(state => state.wishlist?.wishlist || []);
    const [loading, setLoading] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const [wishlistItemId, setWishlistItemId] = useState(null);

    // Check if item is in wishlist and get the wishlist item ID
    useEffect(() => {
        if (wishlistItems && wishlistItems.length > 0 && data?._id) {
            const wishlistItem = wishlistItems.find(item => item.productId?._id === data?._id);
            setInWishlist(!!wishlistItem);
            setWishlistItemId(wishlistItem?._id || null);
        } else {
            setInWishlist(false);
            setWishlistItemId(null);
        }
    }, [wishlistItems, data]);

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (loading || !data?._id) return;
        
        try {
            setLoading(true);
            
            if (inWishlist && wishlistItemId) {
                // Remove from wishlist
                const response = await removeFromWishlist(wishlistItemId);
                if (response && response.success) {
                    setInWishlist(false);
                    setWishlistItemId(null);
                }
            } else {
                // Add to wishlist
                const response = await addToWishlist(data._id);
                if (response && response.success) {
                    // We don't need to manually set inWishlist to true here
                    // as the useEffect will handle this when wishlist updates
                }
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
                disabled={loading}
                className={`z-10 bg-white hover:bg-gray-100 shadow-lg pl-1 pt-1 pr-1 text-lg w-8 h-8 top-2 right-5 rounded-full font-extrabold
                    ${inWishlist ? 'text-red-500' : 'text-gray-500'}
                    ${loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
                {loading ? (
                    <span className="animate-pulse">
                        <CiHeart size={22} />
                    </span>
                ) : inWishlist ? (
                    <FaHeart size={22} />
                ) : (
                    <CiHeart size={22} />
                )}
            </button>
        </div>
    );
};

export default WishlistButton;