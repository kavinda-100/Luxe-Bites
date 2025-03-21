"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type period = "last30" | "last90" | "last365";

// get the statistics like the number of users, number of products, number of orders,
// number of categories, and revenue (compare last moth and current moth value as well).
export async function getAdminStatistics() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
  } catch (e: unknown) {
    console.error("Error in getAdminStatistics", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

// get sales data for the last 30, 90 days and 1 year as a data set for the chart.
export async function getAdminSales({ period }: { period: period }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
  } catch (e: unknown) {
    console.error("Error in getAdminSales", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

// get order data for the last 30, 90 days and 1 year as a data set for the chart.
// like the number of orders, number of products sold, and revenue generated in
// the last 30, 90 days and 1 year.
export async function getAdminOrders({ period }: { period: period }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
  } catch (e: unknown) {
    console.error("Error in getAdminUsers", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

// get user data for the last 30, 90 days and 1 year as a data set for the chart.
// like how many users registered in the last 30 days, 90 days, and 1 year.
export async function getAdminUsers({ period }: { period: period }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
  } catch (e: unknown) {
    console.error("Error in getAdminUsers", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}
