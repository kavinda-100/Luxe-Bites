"use server";

import { subDays } from "date-fns";
import type { OrderStatus } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../../server/db";

export type getOrdersResponse = {
  status: OrderStatus;
  date:
    | "Today"
    | "Yesterday"
    | "Last 7 days"
    | "Last 30 days"
    | "Last 90 days"
    | "All time";
};

export const getOrders = async ({ status, date }: getOrdersResponse) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    let dateFilter: Date;
    const today = new Date();
    switch (date) {
      case "Today":
        dateFilter = new Date(today.setHours(0, 0, 0, 0));
        break;
      case "Yesterday":
        dateFilter = subDays(new Date(), 1);
        break;
      case "Last 7 days":
        dateFilter = subDays(new Date(), 7);
        break;
      case "Last 30 days":
        dateFilter = subDays(new Date(), 30);
        break;
      case "Last 90 days":
        dateFilter = subDays(new Date(), 90);
        break;
      case "All time":
      default:
        dateFilter = new Date(0); // Epoch time
        break;
    }

    const orders = await prisma.order.findMany({
      where: {
        status,
        createdAt: {
          gte: dateFilter,
        },
      },
      include: {
        user: true,
      },
    });

    return orders.map((order) => ({
      orderId: order.id,
      userId: order.userId,
      userEmail: order.user.email,
      productCount: order.productIds.length,
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      status: order.status,
      isPaid: order.isPaid,
      createdAt: order.createdAt,
    }));
  } catch (e: unknown) {
    console.log("Error in getOrders", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    if (!order) throw new Error("Order not found");

    //get the shipping details
    const shippingDetails = await prisma.shippingDetails.findMany({
      where: {
        orderId: orderId,
        userId: order.userId,
      },
    });

    //get the first object from the shipping details
    const shipping = shippingDetails[0];

    // find the products in the order
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: order.productIds,
        },
      },
    });

    const formatedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: order.productIds.filter((id) => id === product.id).length,
      image: product.image,
    }));

    return {
      orderId: order?.id,
      productCount: order?.productIds.length,
      quantity: order?.quantity,
      totalAmount: order?.totalAmount,
      status: order?.status,
      isPaid: order?.isPaid,
      createdAt: order?.createdAt,
      canceledAt: order?.cancelAt,
      user: {
        id: order?.user.id,
        kindeUserId: order?.user.kindUserId,
        email: order?.user.email,
        avatar: order?.user.profilePicture,
      },
      products: formatedProducts,
      shippingDetails: {
        address: shipping?.address,
        city: shipping?.city,
        country: shipping?.country,
        zipCode: shipping?.zip,
        state: shipping?.state,
        phone: shipping?.phone,
        firstName: shipping?.firstName,
        lastName: shipping?.lastName,
      },
    };
  } catch (e: unknown) {
    console.log("Error in getOrderById", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
};

type UpdateOrderStatusType = {
  orderId: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
};

export async function updateOrderStatus({
  orderId,
  status,
}: UpdateOrderStatusType) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error("Order not found");

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
      message: "Order status updated successfully",
    };
  } catch (e: unknown) {
    console.log("Error in updateOrderStatus", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function CancelOrder({
  orderId,
  cancelReason,
  cancelBy,
}: {
  orderId: string;
  cancelReason: string;
  cancelBy: "Admin" | "User";
}) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error("Order not found");

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELLED",
        cnacelReason: cancelReason,
        canceledBy: cancelBy === "Admin" ? "ADMIN" : "USER",
        cancelAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Order canceled successfully",
    };
  } catch (e: unknown) {
    console.log("Error in CancelOrder", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function undoCancelOrder({ orderId }: { orderId: string }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error("Order not found");

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "PENDING",
        cnacelReason: null,
        canceledBy: null,
        cancelAt: null,
      },
    });

    return {
      success: true,
      message: "Order canceled undo successfully",
    };
  } catch (e: unknown) {
    console.log("Error in undoCancelOrder", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}

export async function deleteOrder(orderId: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");
  } catch (e: unknown) {
    console.log("Error in deleteOrder", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal server error");
  }
}
