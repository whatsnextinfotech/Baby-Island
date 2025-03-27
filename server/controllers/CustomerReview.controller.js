import ProductReview from "../models/CustomerReview.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Validate input
    if (!productId || !userId || !userName || !reviewMessage || !reviewValue) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user has purchased the product
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: { $in: ["confirmed", "delivered"] },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase and receive the product to review it",
      });
    }

    // Check for existing review
    const existingReview = await ProductReview.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Create new review
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    // Update product average rating
    const reviews = await ProductReview.find({ productId });
    const averageReview = 
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const reviews = await ProductReview.find({ productId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};