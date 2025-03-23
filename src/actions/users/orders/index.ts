"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../../../server/db";

export async function getMyOrders() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        quantity: true,
        totalAmount: true,
        status: true,
        isPaid: true,
        createdAt: true,
        productIds: true,
      },
    });

    return orders.map((order) => ({
      orderId: order.id,
      userId: user.id,
      userEmail: user.email!,
      productCount: order.productIds.length,
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      status: order.status,
      isPaid: order.isPaid,
      createdAt: order.createdAt,
    }));
  } catch (e: unknown) {
    console.log("Error in getMyOrders", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function getMyOrderById({ orderId }: { orderId: string }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: user.id,
      },
      select: {
        id: true,
        quantity: true,
        totalAmount: true,
        status: true,
        isPaid: true,
        createdAt: true,
        productIds: true,
        shippingDetails: true,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const orderProducts = await prisma.product.findMany({
      where: {
        id: {
          in: order.productIds,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    });

    return {
      orderId: order.id,
      userId: user.id,
      userEmail: user.email,
      productCount: order.productIds.length,
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      status: order.status,
      isPaid: order.isPaid,
      createdAt: order.createdAt,
      products: orderProducts.map((product) => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })),
      shippingDetails: order.shippingDetails,
    };
  } catch (e: unknown) {
    console.log("Error in getMyOrderById", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}
