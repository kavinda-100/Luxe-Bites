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
