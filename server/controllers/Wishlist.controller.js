import WishlistModel from "../models/Wishlist.model.js";
import UserModel from "../models/user.model.js";

// Add to Wishlist
export const addToWishlistController = async (request, response) => {
    try {
        const userId = request.userId;
        const { productId } = request.body;

        if (!productId) {
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                success: false
            });
        }

        // Check if the item is already in the wishlist
        const checkWishlistItem = await WishlistModel.findOne({
            userId: userId,
            productId: productId
        });

        if (checkWishlistItem) {
            return response.status(400).json({
                message: "Item already in wishlist"
            });
        }

        // Add item to wishlist
        const wishlistItem = new WishlistModel({
            userId: userId,
            productId: productId
        });

        const save = await wishlistItem.save();

        // Update user's wishlist array
        await UserModel.updateOne(
            { _id: userId },
            { $push: { wishlist: productId } }
        );

        return response.json({
            data: save,
            message: "Item added to wishlist successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get Wishlist Items
export const getWishlistItemsController = async (request, response) => {
    try {
        const userId = request.userId;

        const wishlistItems = await WishlistModel.find({
            userId: userId
        }).populate('productId');

        return response.json({
            data: wishlistItems,
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Remove Item from Wishlist
export const removeFromWishlistController = async (request, response) => {
    try {
        const userId = request.userId;
        const { _id } = request.body;

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            });
        }

        const removeWishlistItem = await WishlistModel.deleteOne({
            _id: _id,
            userId: userId
        });

        return response.json({
            message: "Item removed from wishlist",
            error: false,
            success: true,
            data: removeWishlistItem
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
