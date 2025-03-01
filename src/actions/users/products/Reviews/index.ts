"use server";

import { checkIsUser } from "../../../AuthActions";
import { prisma } from "../../../../server/db";

type PostReviewProps = {
  productId: string;
  comment: string;
  rating: number;
};

export async function postReview({
  productId,
  comment,
  rating,
}: PostReviewProps) {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // create review
    const review = await prisma.review.create({
      data: {
        comment,
        ratingAmount: rating,
        userId: user.id,
        productId,
      },
    });
    if (!review) {
      throw new Error("Failed to post review");
    }

    return { success: true, message: "Review posted successfully" };
  } catch (e: unknown) {
    console.log("Error in postReview", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function getReviews(productId: string) {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const ratingCounts = await prisma.review.groupBy({
      by: ["ratingAmount"],
      where: { productId },
      _count: {
        ratingAmount: true,
      },
    });

    const ratingSummary = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    ratingCounts.forEach((rating) => {
      ratingSummary[rating.ratingAmount as 1 | 2 | 3 | 4 | 5] =
        rating._count.ratingAmount;
    });

    return ratingSummary;
  } catch (e: unknown) {
    console.log("Error in getReviews", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}
