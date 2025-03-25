import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: []
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        handleAddItemWishlist: (state, action) => {
            state.wishlist = [...action.payload];
        },
        handleClearWishlist: (state) => {
            state.wishlist = [];
        }
    }
});

export const { handleAddItemWishlist, handleClearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;