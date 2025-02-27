"use server";

import { checkIsUser } from "../../AuthActions";
import { prisma } from "../../../server/db";

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
