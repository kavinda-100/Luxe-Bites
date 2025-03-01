"use server";

import { checkIsUser } from "../../../AuthActions";
import { prisma } from "../../../../server/db";

export async function getCartItemsCount() {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("User not found");
    }
    // Fetch cart items count from the database
    const count = await prisma.cart.aggregate({
      where: {
        userId: user.id,
      },
      _count: {
        id: true,
      },
    });

    return {
      success: true,
      count: count._count.id ?? 0,
    };
  } catch (e: unknown) {
    console.log("Error in getCartItemsCount", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function getCartItems() {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("User not found");
    }
    // Fetch cart items from the database
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      cartItems,
    };
  } catch (e: unknown) {
    console.log("Error in getCartItems", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function addToCart({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the product exists,
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    // Check if the product is already in the cart, id yes, update the quantity else add the product to the cart
    const cartItem = await prisma.cart.findFirst({
      where: {
        userId: user.id,
        productId: product.id,
      },
    });
    if (cartItem) {
      await prisma.cart.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: quantity > 1 ? quantity : cartItem.quantity + 1, // If the quantity is greater than 1, update the quantity else increment the quantity by 1
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          quantity,
          productId: productId,
          userId: user.id,
        },
      });
    }

    return {
      success: true,
    };
  } catch (e: unknown) {
    console.log("Error in addToCart", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function updateCartItemQuantity({
  cartItemId,
  newQuantity,
}: {
  cartItemId: string;
  newQuantity: number;
}) {
  try {
    const user = await checkIsUser();
    if (!user) {
      throw new Error("User not found");
    }

    await prisma.cart.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    return {
      success: true,
    };
  } catch (e: unknown) {
    console.error("Error updating cart item quantity", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}
