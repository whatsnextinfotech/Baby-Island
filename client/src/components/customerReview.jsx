import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews, clearError } from "../store/customerReviewSlice";
import StarRatingComponent from "./StarRatingComponent";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const ReviewComponent = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, isLoading, error } = useSelector((state) => state.reviews);
  const [reviewData, setReviewData] = useState({
    reviewMessage: "",
    reviewValue: 0,
  });

  useEffect(() => {
    if (productId) {
      dispatch(getReviews(productId));
    }
    return () => dispatch(clearError());
  }, [dispatch, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    if (!userId || !userName) {
      alert("Please login to submit a review");
      return;
    }

    if (reviewData.reviewValue === 0) {
      alert("Please select a rating");
      return;
    }

    const formData = {
      productId,
      userId,
      userName,
      reviewMessage: reviewData.reviewMessage,
      reviewValue: reviewData.reviewValue,
    };

    await dispatch(addReview(formData));
    if (!error) {
      setReviewData({ reviewMessage: "", reviewValue: 0 });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Rating:</label>
          <StarRatingComponent
            rating={reviewData.reviewValue}
            handleRatingChange={(value) =>
              setReviewData((prev) => ({ ...prev, reviewValue: value }))
            }
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Your Review:</label>
          <Textarea
            value={reviewData.reviewMessage}
            onChange={(e) =>
              setReviewData((prev) => ({ ...prev, reviewMessage: e.target.value }))
            }
            placeholder="Share your experience..."
            required
            rows={4}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Review"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{review.userName}</span>
                <StarRatingComponent rating={review.reviewValue} disabled />
              </div>
              <p className="text-gray-700">{review.reviewMessage}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;