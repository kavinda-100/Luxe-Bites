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

export async function getWishList({ pageParam }: { pageParam: number }) {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const take = 5;
    const skip = (pageParam - 1) * take;

    const wishList = await prisma.wishlist.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        productId: true,
      },
    });
    // get the product details
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: wishList.map((w) => w.productId),
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        description: true,
        stock: true,
        discount: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      take,
      skip,
    });

    return products.map((p) => {
      return {
        id: p.id,
        name: p.name,
        image: p.image,
        description: p.description,
        price: p.price,
        discount: p.discount,
        stock: p.stock,
        reviews: p._count.reviews,
        wishlists: wishList.filter((w) => w.productId === p.id),
      };
    });
  } catch (e: unknown) {
    console.log("Error in getWishList", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}
