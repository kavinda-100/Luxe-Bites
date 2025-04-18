"use client";

import React from "react";
import type { ChartConfig } from "../../../../../../components/ui/chart";
import { SalesChart } from "./SalesChart";
import { getAdminSales, type period } from "../../../../../../actions/admin";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../../../../../components/ui/skeleton";

const chartConfig = {
  Sales: {
    label: "Sales",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// const chartData = [
//   { date: "2025-03-01", orders: 222, revenue: 150 },
//   { date: "2025-03-02", orders: 97, revenue: 180 },
//   { date: "2025-03-03", orders: 167, revenue: 120 },
//   { date: "2025-03-04", orders: 242, revenue: 260 },
// ];

// const startDate = new Date("2025-01-01");
// const newChartData = Array.from({ length: 90 }).map((_, index) => {
//   const date = new Date(startDate);
//   date.setDate(date.getDate() + index);
//   return {
//     date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
//     orders: Math.ceil(Math.random() * 1000),
//     revenue: Math.ceil(Math.random() * 1000),
//   };
// });
// console.log(newChartData);

const SalesPage = () => {
  const [timeRange, setTimeRange] = React.useState<period>("90d");

  const { data, isLoading, error } = useQuery({
    queryKey: ["salesChartData"],
    queryFn: async () => getAdminSales({ period: timeRange }),
  });

  if (isLoading) {
    return <Skeleton className={"container mx-auto min-h-[300px] w-full"} />;
  }

  if (error) {
    return (
      <div className={"container mx-auto"}>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  console.log(data);
  return (
    <section className={"container mx-auto"}>
      <SalesChart
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        chartConfig={chartConfig}
        chartData={data ?? []}
      />
    </section>
  );
};
export default SalesPage;
