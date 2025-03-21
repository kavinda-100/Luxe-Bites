"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";
import { prisma } from "../../server/db";

export type period = "last30" | "last90" | "last365";

/**@description get the statistics like the number of users, number of products, number of orders,
 number of categories, and revenue (compare last moth and current moth value as well).
 @returns {
  order: {
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  },
  user: {
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  },
  product: {
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  },
  activeProduct: {
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  },
  category: {
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  },
  revenue: {
  total: number;
  lastMonth: number;
  thisMonth: number;
  isIncreasing: boolean;
  percentageChange: number;
  },
  }
 **/
export async function getAdminStatistics() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);
    const startOfLastMonth = startOfMonth(subMonths(now, 1));
    const endOfLastMonth = endOfMonth(subMonths(now, 1));

    const [
      totalOrders,
      ordersLastMonth,
      ordersThisMonth,
      totalUsers,
      usersLastMonth,
      usersThisMonth,
      totalProducts,
      productsLastMonth,
      productsThisMonth,
      totalCategories,
      categoriesLastMonth,
      categoriesThisMonth,
      totalRevenue,
      revenueLastMonth,
      revenueThisMonth,
      productsActive,
      productsActiveLastMonth,
      productsActiveThisMonth,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.order.count({
        where: {
          createdAt: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth,
          },
        },
      }),
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth,
          },
        },
      }),
      prisma.product.count(),
      prisma.product.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.product.count({
        where: {
          createdAt: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth,
          },
        },
      }),
      prisma.category.count(),
      prisma.category.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.category.count({
        where: {
          createdAt: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth,
          },
        },
      }),
      prisma.order
        .aggregate({
          _sum: {
            totalAmount: true,
          },
        })
        .then((result) => result._sum.totalAmount ?? 0),
      prisma.order
        .aggregate({
          _sum: {
            totalAmount: true,
          },
          where: {
            createdAt: {
              gte: startOfLastMonth,
              lte: endOfLastMonth,
            },
          },
        })
        .then((result) => result._sum.totalAmount ?? 0),
      prisma.order
        .aggregate({
          _sum: {
            totalAmount: true,
          },
          where: {
            createdAt: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth,
            },
          },
        })
        .then((result) => result._sum.totalAmount ?? 0),
      prisma.product.count({
        where: {
          active: true,
        },
      }),
      prisma.product.count({
        where: {
          active: true,
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.product.count({
        where: {
          active: true,
          createdAt: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth,
          },
        },
      }),
    ]);

    const revenuePercentageChange =
      revenueLastMonth === 0
        ? 0
        : ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;
    const ordersPercentageChange =
      ordersLastMonth === 0
        ? 0
        : ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100;
    const usersPercentageChange =
      usersLastMonth === 0
        ? 0
        : ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100;
    const productsPercentageChange =
      productsLastMonth === 0
        ? 0
        : ((productsThisMonth - productsLastMonth) / productsLastMonth) * 100;
    const categoriesPercentageChange =
      categoriesLastMonth === 0
        ? 0
        : ((categoriesThisMonth - categoriesLastMonth) / categoriesLastMonth) *
          100;
    const productsActivePercentageChange =
      productsActiveLastMonth === 0
        ? 0
        : ((productsActiveThisMonth - productsActiveLastMonth) /
            productsActiveLastMonth) *
          100;

    return {
      order: {
        total: totalOrders,
        lastMonth: ordersLastMonth,
        thisMonth: ordersThisMonth,
        isIncreasing: ordersThisMonth > ordersLastMonth,
        percentageChange: ordersPercentageChange,
      },
      user: {
        total: totalUsers,
        lastMonth: usersLastMonth,
        thisMonth: usersThisMonth,
        isIncreasing: usersThisMonth > usersLastMonth,
        percentageChange: usersPercentageChange,
      },
      product: {
        total: totalProducts,
        lastMonth: productsLastMonth,
        thisMonth: productsThisMonth,
        isIncreasing: productsThisMonth > productsLastMonth,
        percentageChange: productsPercentageChange,
      },
      productActive: {
        total: productsActive,
        lastMonth: productsActiveLastMonth,
        thisMonth: productsActiveThisMonth,
        isIncreasing: productsActiveThisMonth > productsActiveLastMonth,
        percentageChange: productsActivePercentageChange,
      },
      category: {
        total: totalCategories,
        lastMonth: categoriesLastMonth,
        thisMonth: categoriesThisMonth,
        isIncreasing: categoriesThisMonth > categoriesLastMonth,
        percentageChange: categoriesPercentageChange,
      },
      revenue: {
        total: totalRevenue,
        lastMonth: revenueLastMonth,
        thisMonth: revenueThisMonth,
        isIncreasing: revenueThisMonth > revenueLastMonth,
        percentageChange: revenuePercentageChange,
      },
    };
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
