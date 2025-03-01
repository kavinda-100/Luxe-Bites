"use server";

import { checkIsUser } from "../../../AuthActions";
import { prisma } from "../../../../server/db";

export async function addOrRemoveFromWishList({
  productId,
}: {
  productId: string;
}) {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // check if the product exists
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    // check if the product is already in the wishlist
    const wishList = await prisma.wishlist.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    });
    // if the product is in the wishlist, remove it
    if (wishList) {
      await prisma.wishlist.delete({
        where: {
          id: wishList.id,
        },
      });
      return {
        success: true,
        message: "Product removed from wishlist",
        wishListId: wishList.id,
      };
    }
    // if the product is not in the wishlist, add it
    const newWishList = await prisma.wishlist.create({
      data: {
        userId: user.id,
        productId,
      },
    });
    if (!newWishList) {
      throw new Error("Error adding product to wishlist");
    }
    return {
      success: true,
      message: "Product added to wishlist",
      wishListId: newWishList.id,
    };
  } catch (e: unknown) {
    console.log("Error in addOrRemoveFromWishList", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}
