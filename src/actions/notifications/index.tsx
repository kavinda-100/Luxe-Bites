"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../../server/db";

type NotificationFilters = {
  filter: "all" | "unread" | "read";
};

export async function getAllNotifications({ filter }: NotificationFilters) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await prisma.notification.findMany({
      where: {
        read: filter === "all" ? undefined : filter === "read",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (e: unknown) {
    console.log("Error in getAllNotifications", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function markAsRead(id: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await prisma.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });
  } catch (e: unknown) {
    console.log("Error in markAsRead", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

export async function clearAllNotifications() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await prisma.notification.deleteMany({
      where: {
        read: true,
      },
    });

    return {
      success: true,
      message: "All notifications cleared successfully",
    };
  } catch (e: unknown) {
    console.log("Error in clearAllNotifications", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}
