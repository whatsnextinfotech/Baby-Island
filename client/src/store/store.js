import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartProduct'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'
import customerReviewReducer from './customerReviewSlice';
import wishlistReducer from "./wishlist";

export const store = configureStore({
  reducer: {
    user : userReducer,
    product : productReducer,
    cartItem : cartReducer,
    addresses : addressReducer,
    orders : orderReducer,
    reviews: customerReviewReducer,
    wishlist: wishlistReducer // Add the wishlist reducer
  },
})