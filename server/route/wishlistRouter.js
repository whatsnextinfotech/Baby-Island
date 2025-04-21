import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToWishlistController, getWishlistItemsController, removeFromWishlistController } from "../controllers/wishlistController.js";

const wishlistRouter = Router();

wishlistRouter.post('/add',auth, addToWishlistController);  // Add item to wishlist
wishlistRouter.get('/get',auth, getWishlistItemsController); // Get wishlist items
wishlistRouter.delete('/remove',auth, removeFromWishlistController); // Remove item from wishlist

export default wishlistRouter;