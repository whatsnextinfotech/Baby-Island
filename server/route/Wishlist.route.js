import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToWishlistController, getWishlistItemsController, removeFromWishlistController } from "../controllers/Wishlist.controller.js";

const wishlistRouter = Router();

wishlistRouter.post('/add', addToWishlistController);  // Add item to wishlist
wishlistRouter.get('/get', getWishlistItemsController); // Get wishlist items
wishlistRouter.delete('/remove', removeFromWishlistController); // Remove item from wishlist

export default wishlistRouter;
