import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await Axios({
        ...SummaryApi.createReview,
        data: reviewData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to add review" });
    }
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await Axios({
        url: `${SummaryApi.getReviewById.url.replace(":id", productId)}`,
        method: "get",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch reviews" });
    }
  }
);

const customerReviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.unshift(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data || [];
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.reviews = [];
      });
  },
});

export const { clearError } = customerReviewSlice.actions;
export default customerReviewSlice.reducer;