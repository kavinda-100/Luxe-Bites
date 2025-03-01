"use client";

import React from "react";
import { StarIcon } from "lucide-react";
import { cn } from "../../../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../../../../actions/users/products/Reviews";
import { Skeleton } from "../../../../../components/ui/skeleton";

const ReviewChart = ({ productId }: { productId: string }) => {
  // Fetch reviews using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId, "reviews"],
    queryFn: () => getReviews(productId),
  });

  if (isLoading) {
    return <Skeleton className={"h-[400px] w-full"} />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Extract rating counts
  const ratingCounts = data ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  // Calculate total reviews
  const totalReviews = Object.values(ratingCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  // Calculate average rating
  const averageRating =
    totalReviews === 0
      ? 0
      : (
          (ratingCounts[5] * 5 +
            ratingCounts[4] * 4 +
            ratingCounts[3] * 3 +
            ratingCounts[2] * 2 +
            ratingCounts[1]) /
          totalReviews
        ).toFixed(1);

  return (
    <div className="w-full rounded-md bg-background p-4">
      {/* Overall Rating & Stars */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={cn("size-5", {
                "fill-yellow-500 text-yellow-500":
                  i < Math.round(Number(averageRating)),
                "text-gray-300": i >= Math.round(Number(averageRating)),
              })}
            />
          ))}
        </div>
        <p className="text-lg font-bold">{averageRating}</p>
      </div>

      {/* Rating Bars */}
      <div className="mt-4 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const percentage =
            totalReviews === 0
              ? 0
              : (ratingCounts[star as 1 | 2 | 3 | 4 | 5] / totalReviews) * 100;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-6 text-sm font-semibold">{star}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-600">
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="w-6 text-sm">
                {ratingCounts[star as 1 | 2 | 3 | 4 | 5]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewChart;
