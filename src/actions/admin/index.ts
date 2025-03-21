"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns";
import { prisma } from "../../server/db";

export type period = "7d" | "30d" | "90d" | "365d";

/**
 * @description get the statistics like the number of users, number of products, number of orders,
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
        ? revenueThisMonth > 0
          ? 100
          : 0
        : ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;

    const ordersPercentageChange =
      ordersLastMonth === 0
        ? ordersThisMonth > 0
          ? 100
          : 0
        : ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100;

    const usersPercentageChange =
      usersLastMonth === 0
        ? usersThisMonth > 0
          ? 100
          : 0
        : ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100;

    const productsPercentageChange =
      productsLastMonth === 0
        ? productsThisMonth > 0
          ? 100
          : 0
        : ((productsThisMonth - productsLastMonth) / productsLastMonth) * 100;

    const categoriesPercentageChange =
      categoriesLastMonth === 0
        ? categoriesThisMonth > 0
          ? 100
          : 0
        : ((categoriesThisMonth - categoriesLastMonth) / categoriesLastMonth) *
          100;

    const productsActivePercentageChange =
      productsActiveLastMonth === 0
        ? productsActiveThisMonth > 0
          ? 100
          : 0
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

/** get sales data for the last 7, 30, 90 days and 1 year as a data set for the chart.
 * return type:-
 * chartData = [
 *   { date: "2025-03-01", orders: 222, revenue: 150 },
 *   { date: "2025-03-02", orders: 97, revenue: 180 },
 *   { date: "2025-03-03", orders: 167, revenue: 120 },
 *   { date: "2025-03-04", orders: 242, revenue: 260 },
 * ];
 * **/
export async function getAdminSales({ period }: { period: period }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "7d":
        startDate = subDays(now, 7);
        break;
      case "30d":
        startDate = subDays(now, 30);
        break;
      case "90d":
        startDate = subDays(now, 90);
        break;
      case "365d":
        startDate = subDays(now, 365);
        break;
      default:
        throw new Error("Invalid period");
    }

    const salesData = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        totalAmount: true,
      },
    });

    return salesData.map((order) => ({
      date: format(order.createdAt, "yyyy-MM-dd"),
      orders: order._count.id,
      revenue: order._sum.totalAmount,
    }));
  } catch (e: unknown) {
    console.error("Error in getAdminSales", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

/** get order data for the last 7, 30, 90 days and 1 year as a data set for the chart.
 * like the number of orders, the number of products sold.
 * return type:-
 * chartData = [
 *   { date: "2025-03-01", orders: 222, products: 150 },
 *   { date: "2025-03-02", orders: 97, products: 180 },
 *   { date: "2025-03-03", orders: 167, products: 120 },
 *   { date: "2025-03-04", orders: 242, products: 260 },
 * ];
 * **/
export async function getAdminOrders({ period }: { period: period }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "7d":
        startDate = subDays(now, 7);
        break;
      case "30d":
        startDate = subDays(now, 30);
        break;
      case "90d":
        startDate = subDays(now, 90);
        break;
      case "365d":
        startDate = subDays(now, 365);
        break;
      default:
        throw new Error("Invalid period");
    }

    const salesData = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        quantity: true,
      },
    });

    return salesData.map((order) => ({
      date: format(order.createdAt, "yyyy-MM-dd"),
      orders: order._count.id,
      products: order._sum.quantity,
    }));
  } catch (e: unknown) {
    console.error("Error in getAdminUsers", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}

/** get no of users that registered in each month for the last 12 months.
 * if no user registered in a month, then the value should be 0.
 * return type:-
 * chartData = [
 *   { month: "January", visitors: 186 },
 *   { month: "February", visitors: 305 },
 *   { month: "March", visitors: 237 },
 *   { month: "April", visitors: 73 },
 *   { month: "May", visitors: 209 },
 *   { month: "June", visitors: 214 },
 *   { month: "July", visitors: 80 },
 *   { month: "August", visitors: 189 },
 *   { month: "September", visitors: 120 },
 *   { month: "October", visitors: 290 },
 *   { month: "November", visitors: 150 },
 *   { month: "December", visitors: 180 },
 * ];
 * **/

export async function getAdminUsers() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const now = new Date();
    const months = Array.from({ length: 12 })
      .map((_, i) => {
        const date = subMonths(now, i);
        return {
          start: startOfMonth(date),
          end: endOfMonth(date),
          month: format(date, "MMMM"),
        };
      })
      .reverse();

    const userCounts = await Promise.all(
      months.map(({ start, end }) =>
        prisma.user.count({
          where: {
            createdAt: {
              gte: start,
              lte: end,
            },
          },
        }),
      ),
    );

    return months.map((month, index) => ({
      month: month.month,
      visitors: userCounts[index],
    }));
  } catch (e: unknown) {
    console.error("Error in getAdminUsers", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Internal Server Error");
  }
}
