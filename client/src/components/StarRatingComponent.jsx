import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange, disabled = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={() => handleRatingChange?.(star)}
          className={`p-1 ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
        >
          <StarIcon
            className={`w-5 h-5 ${star <= rating ? "fill-yellow-500" : "fill-none"}`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;