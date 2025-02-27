import React from "react";
import { cn } from "../../../../../lib/utils";
import { Star } from "lucide-react";

type StarRatingProps = {
  reviews: number;
};

const StarRating = ({ reviews }: StarRatingProps) => {
  const totalStars = 5;
  const filledStars = Math.round(reviews / totalStars);

  return (
    <div className={"flex items-center gap-4"}>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalStars }, (_, index) => (
          <Star
            key={index}
            className={cn("size-4", {
              "fill-yellow-400 text-yellow-400": index < filledStars,
              "text-gray-300": index >= filledStars,
            })}
          />
        ))}
      </div>
      <span className={"text-sm text-gray-500"}>{reviews} reviews</span>
    </div>
  );
};

export default StarRating;
